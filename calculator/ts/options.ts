namespace Components {
    export class Options {
        private data                        : optionsData;
        private elems                       : object = {
                                                options: {},
                                                connections: {
                                                    types: {},
                                                    sizes: {}
                                                }
                                            };

        private table                       : Table;
        private pagination                  : Pagination;

        constructor(wrap: HTMLElement) {
            /* TODO: разобраться с wrap */
            const tableWrap: HTMLElement    = document.querySelector('.table-wrap');

            this.table                      = new Table(tableWrap);
            this.pagination                 = new Pagination(tableWrap, () => { this.onChange().then(); });

            this.fetchesOptions(document.querySelector('.option-options')).then();
            this.fetchesConnections(document.querySelector('.option-connections')).then();
        }

        private async fetchesOptions(wrap: HTMLElement): Promise<void> {
            let requests = optionsArray.map(name => fetch(`http://192.168.0.178:5049/products/options/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            }));

            Promise.all(requests).then(async responses => {
                let result = responses.map(async r => await r.json())

                let i = 0;
                for (const key in options) {
                    this.elems['options'][key] = new Select(wrap, options[key], key, result[i++]);
                    this.elems['options'][key].on('change', async () => {
                        await this.onChange()
                    });
                }
            });
        }

        private async fetchesConnections(wrap: HTMLElement): Promise<void> {
            fetch('http://192.168.0.178:5049/products/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            })
                .then(async response => {
                    let result = await response.json();

                    for (const key in connections) {
                        const typeName = connections[key]['connectionTypes'].name;
                        const typeHead = connections[key]['connectionTypes'].head;
                        const sizeName = connections[key]['connectionSizes'].name;
                        const sizeHead = connections[key]['connectionSizes'].head;

                        this.elems['connections']['types'][key] = new Select(wrap, typeHead, typeName, result[key]['connectionTypes']);
                        this.elems['connections']['sizes'][key] = new Select(wrap, sizeHead, sizeName, result[key]['connectionSizes']);

                        this.elems['connections']['types'][key].on('change', async () => {
                            await this.onChange()
                        });
                        this.elems['connections']['sizes'][key].on('change', async () => {
                            await this.onChange()
                        });
                    }
                })
                .catch(response => { console.log('request failed: http://192.168.0.178:5049/products/connections'); console.log(response); });
        }

        private async onChange(): Promise<void> {
            this.collectData();
            await this.sendConnections();
            await this.sendOptions();
            await this.sendSold();
        }

        private collectData(exception: string = ''): void {
            let data: optionsData = {};
            for (const key in this.elems['options']) {
                // if (key === exception) {
                //     // delete data[key];
                //     continue;
                // }
                const value = this.elems['options'][key].getValue();
                if (value !== '') data[key] = value;
            }

            /* TODO: переписать этот кошмар */
            // data['connections'] = [
            //     {
            //         connectionNo: 0,
            //         connectionType: '',
            //         connectionSize: '',
            //     },
            //     {
            //         connectionNo: 0,
            //         connectionType: '',
            //         connectionSize: '',
            //     },
            //     {
            //         connectionNo: 0,
            //         connectionType: '',
            //         connectionSize: '',
            //     },
            //     {
            //         connectionNo: 0,
            //         connectionType: '',
            //         connectionSize: '',
            //     }
            // ]
            // for (let i = 0; i < 4 /* TODO: магическое число заменить */; i++) {
            //     // if (key === exception) {
            //     //     // delete data[key];
            //     //     continue;
            //     // }
            //     data['connections'][i]['connectionNo'] = Number(i) + 1;
            //     const type = this.elems['connections']['types'][i].getValue();
            //     if (type !== '') data['connections'][i]['connectionType'] = type;
            //
            //     const size = this.elems['connections']['sizes'][i].getValue();
            //     if (size !== '') data['connections'][i]['connectionSize'] = size;
            // }

            this.data = data;
        }

        private redrawSelectsOptions(dataResp): void {
            let i = 0;
            for (const key in options) {
                // if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;

                this.elems['options'][key].redrawOptions(dataResp[i++]);
            }
        }

        private redrawSelectsConnections(dataResp): void {
            let j = 0;
            for (const key in connections) {
                this.elems['connections']['types'][key].redrawConnections(dataResp[j++]['connectionTypes']);

                j = 0;
                this.elems['connections']['sizes'][key].redrawConnections(dataResp[j++]['connectionSizes']);
            }
        }

        private redrawProductsTable(dataResp): void {
            this.table.redraw(dataResp['soldProducts']);
            this.pagination.redraw(dataResp['availablePages']);
        }

        private async sendOptions() {
            let requests = optionsArray.map(name => fetch(`http://192.168.0.178:5049/products/options/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.data)
            }));

            Promise.all(requests).then(async responses => {
                let result = responses.map(async r => await r.json());
                this.redrawSelectsOptions(result);
            })
        }

        private async sendConnections(): Promise<void> {
            fetch('http://192.168.0.178:5049/products/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.data)
            })
                .then(async response => {
                    let result = await response.json();
                    this.redrawSelectsConnections(result);
                })
        }
        private async sendSold(): Promise<void> {
            const page = this.pagination.getPage().toString();
            fetch(`http://192.168.0.178:5049/products/sold?PageId=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.data)
            })
                .then(async response => {
                    let result = await response.json();
                    this.redrawProductsTable(result);
                })
        }
    }
}
