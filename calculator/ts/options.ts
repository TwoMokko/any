const options = {
    type: "Тип изделия",
    assembly: "Корпус или сборка",
    series: "серия",
    additionalCoverage: "дополнительное покрытие",
    cleaningUnderOxygen: "очистка под кислород",
    mainMaterial: "основной материал",
    needleType: "тип иглы",
    handleType: "тип рукоятки",
    surfaceType: "тип поверхности",
    sealMaterial: "материал уплотнения",
    geometricConfiguration: "геометрическая конфигурация изделия",
    loadOption: "опция постоянной нагрузки у NV вентелей",
    panelMounting: "крепление на панель",
    pressureOption345b: "опция давления у NV",
    darinageOption: "опция дренажа",
    connectionPlug: "заглушка подсоединения",
    handleColor: "цвет рукоятки",
    driveType: "тип привода",
    conditionalPassageDiameter: "нестандартное ДУ",
    filterType: "тип фильтра",
    springType: "тип пружины",
    perssureValveSetting: "давление настройки клапана",
    highPressureOption: "опция высокого давления",
    len: "опция длины фитинга",
    zcrConnectionOption: "опция плечиков у подсоеднения у ZCR",
    meltingPoint: "Температура плавления защитного материала заглушки",
    plasticBodyColor: "цвет у брс",
}

const connections = [
    {
        connectionTypes: {
            name: 'conn1',
            head: 'тип подсоединения 1',
        },
        connectionSizes: {
            name: 'size1',
            head: 'размер подсоединения 1',
        }
    },
    {
        connectionTypes: {
            name: 'conn2',
            head: 'тип подсоединения 2',
        },
        connectionSizes: {
            name: 'size2',
            head: 'размер подсоединения 2',
        }
    },
    {
        connectionTypes: {
            name: 'conn3',
            head: 'тип подсоединения 3',
        },
        connectionSizes: {
            name: 'size3',
            head: 'размер подсоединения 3',
        }
    },
    {
        connectionTypes: {
            name: 'conn4',
            head: 'тип подсоединения 4',
        },
        connectionSizes: {
            name: 'size4',
            head: 'размер подсоединения 4',
        }
    },
]


const optionsArray = [
    'type',
    'assembly',
    'series',
    'additionalCoverage',
    'cleaningUnderOxygen',
    'mainMaterial',
    'needleType',
    'handleType',
    'surfaceType',
    'sealMaterial',
    'geometricConfiguration',
    'loadOption',
    'panelMounting',
    'pressureOption345b',
    'darinageOption',
    'connectionPlug',
    'handleColor',
    'driveType',
    'conditionalPassageDiameter',
    'filterType',
    'springType',
    'perssureValveSetting',
    'highPressureOption',
    'len',
    'zcrConnectionOption',
    'meltingPoint',
    'plasticBodyColor',
]
const connectionsArray = [
    'тип подсоединения 1',
    'тип подсоединения 2',
    'тип подсоединения 3',
    'тип подсоединения 4',
    'размер подсоединения 1',
    'размер подсоединения 2',
    'размер подсоединения 3',
    'размер подсоединения 4',
]

interface connections {
    connectionNo: number,
    connectionType: string,
    connectionSize: string
}

type optionsData = {
    type?: string,
    assembly?: string,
    series?: string,
    additionalCoverage?: string,
    cleaningUnderOxygen?: string,
    mainMaterial?: string,
    needleType?: string,
    handleType?: string,
    surfaceType?: string,
    sealMaterial?: string,
    geometricConfiguration?: string,
    loadOption?: string,
    panelMounting?: string,
    pressureOption345b?: string,
    darinageOption?: string,
    connectionPlug?: string,
    handleColor?: string,
    driveType?: string,
    conditionalPassageDiameter?: string,
    filterType?: string,
    springType?: string,
    perssureValveSetting?: string,
    highPressureOption?: string,
    len?: string,
    zcrConnectionOption?: string,
    meltingPoint?: string,
    plasticBodyColor?: string,
    connections?: connections[]
}

namespace Components {
    export class Options {
        data: optionsData;
        elems: object = {
            options: {},
            connections: {
                types: {},
                sizes: {}
            }
        };
        constructor(wrap: HTMLElement) {
            this.fetches(document.querySelector('.option-options')).then();
            this.fetchesConnections(document.querySelector('.option-connections')).then();
        }

        private async fetches(wrap: HTMLElement): Promise<void> {
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
                    // if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;

                    this.elems['options'][key] = new Select(wrap, options[key], key, result[i++]);
                    this.elems['options'][key].on('change', async () => {
                        this.collectData();
                        await this.sendOptions();
                        await this.sendConnections();
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

                    console.log('json', result);

                    for (const key in connections) {
                        const typeName = connections[key]['connectionTypes'].name;
                        const typeHead = connections[key]['connectionTypes'].head;
                        const sizeName = connections[key]['connectionSizes'].name;
                        const sizeHead = connections[key]['connectionSizes'].head;

                        this.elems['connections']['types'][key] = new Select(wrap, typeHead, typeName, result[key]['connectionTypes']);
                        this.elems['connections']['sizes'][key] = new Select(wrap, sizeHead, sizeName, result[key]['connectionSizes']);

                        this.elems['connections']['types'][key].on('change', async () => {
                            this.collectData();
                            await this.sendConnections();
                            await this.sendOptions();
                        });
                        this.elems['connections']['sizes'][key].on('change', async () => {
                            this.collectData();
                            await this.sendConnections();
                            await this.sendOptions();
                        });
                    }
                })
                .catch(response => { console.log('request failed: http://192.168.0.178:5049/products/connections'); console.log(response); });
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
            // for (const key in this.elems['connections']['types']) {
            //     // if (key === exception) {
            //     //     // delete data[key];
            //     //     continue;
            //     // }
            //     data['connections'][key]['connectionNo'] = key + 1;
            //     const value = this.elems['connections']['types'][key].getValue();
            //     if (value !== '') data['connections'][key]['connectionTypes'] = value;
            // }
            // for (const key in this.elems['connections']['sizes']) {
            //     // if (key === exception) {
            //     //     // delete data[key];
            //     //     continue;
            //     // }
            //     const value = this.elems['connections']['sizes'][key].getValue();
            //     if (value !== '') data['connections'][key]['connectionSizes'] = value;
            // }

            this.data = data;
        }

        private redrawSelectsOptions(dataResp): void {
            let i = 0;
            for (const key in options) {
                // if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;

                this.elems['options'][key].redrawOptions(dataResp[i++]);
            }
            // let j = 0;
            // for (const key in connections) {
            //     this.elems['connections']['types'][key].redrawOptions(dataResp[j++]['connectionTypes']);
            //
            //     j = 0;
            //     this.elems['connections']['sizes'][key].redrawOptions(dataResp[j++]['connectionSizes']);
            // }
        }

        private redrawSelectsConnections(dataResp): void {
            // let i = 0;
            // for (const key in options) {
            //     // if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;
            //
            //     this.elems['options'][key].redrawConnections(dataResp[i++]);
            // }
            let j = 0;
            for (const key in connections) {
                this.elems['connections']['types'][key].redrawConnections(dataResp[j++]['connectionTypes']);

                j = 0;
                this.elems['connections']['sizes'][key].redrawConnections(dataResp[j++]['connectionSizes']);
            }
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
    }
}
