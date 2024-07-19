namespace Components {
    import Request = Base.Request;

    export class SubTable {
        private orderId: string = '';

        constructor() {

        }

        public redraw(trTarget: HTMLElement, data, orderId: string): void {
            this.orderId = orderId;
            const nextTr = document.createElement('tr');
            nextTr.className = 'table-row-secondary';
            trTarget.after(nextTr);
            const td = createElement('td', null, null, nextTr);
            td.setAttribute('colspan', '14');

            const expanded = createElement('div', 'expanded', null, td);

            const tBody: HTMLElement = this.createTable(expanded);
            this.fillTable(data, tBody);
            this.createTotal(tBody);


            const invoiceDocs = createElement('div', 'invoice-docs', null, expanded);

            // const btnWrap = createElement('div', null, null, invoiceDocs);
            // createElement('div', null, 'Документы по заказу', btnWrap);
            // const btnImgWrap = createElement('div', null, null, btnWrap);
            // createElement('img', null, null, btnImgWrap).src = 'resources/img/download.svg';

            const offerList: HTMLElement = this.createDocs(invoiceDocs, 'Коммерческое предложение');
            this.fillDocs(offerList, data.files['commercial']);

            if (data.files['shipment']) {
                const shipmentList: HTMLElement = this.createDocs(invoiceDocs, 'Отгрузка');
                this.fillDocs(shipmentList, data.files['shipment']);
            }
        }

        private createTable(expanded: HTMLElement): HTMLElement {
            const tableSecondaryWrap = createElement('div', 'table-secondary', null, expanded);
            const tableSecondary = createElement('table', null, null, tableSecondaryWrap);
            const tHead = createElement('thead', null, null, tableSecondary);
            const tHeadRow = createElement('tr', null, null, tHead);

            const tHeadTextContent = [
                '№',
                'Наименование',
                'Кол-во',
                'Стоимость за шт. без НДС',
                'Стоимость с НДС',
                'Отгружено',
                'Паспорт',
            ];

            tHeadTextContent.forEach((item: string, i: number, thTopTextContent: string[]) => {
                createElement('th', null, item, tHeadRow);
            });

            return createElement('tbody', null, null, tableSecondary);
        }

        private fillTable(data, tBody: HTMLElement): void {
            let num = 1;
            for (const item in data.items) {
                const tr = createElement('tr', null, null, tBody);
                createElement('td', null, String(num), tr);
                num++;
                for (let key in data.items[item]) {
                    const td = createElement('td', null, data.items[item][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor: HTMLAnchorElement = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img: HTMLImageElement = createElement('img', null, null, anchor);
                img.src = 'resources/img/download.svg';
            }
        }

        private createTotal(tBody: HTMLElement): void {
            // TODO высчитывать textContent
            const lastTr = createElement('tr', 'total', null, tBody);
            createElement('td', null, 'Итого:', lastTr);
            createElement('td', null, null, lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, null, lastTr);
        }

        private createDocs(invoiceDocs: HTMLElement, header: string): HTMLElement {
            const offerWrap = createElement('div', 'expanded-documents', null, invoiceDocs);
            createElement('div', null, header, offerWrap);
            return createElement('div', null, null, offerWrap);
        }

        private fillDocs(list: HTMLElement, data): void {
            for (const key in data) {
                const anchor = createElement('a', null, null, list);
                anchor.onclick = () => {
                    this.downloadFile(list, data[key]);
                };
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
        }

        private downloadFile(container: HTMLElement, filename: string): void {
            const anchor = createElement('a', 'hide', null, container);
            anchor.href = this.getFile(filename);
            anchor.download = filename;
            anchor.click();
        }

        private getFile(filename: string) {
            const data = {
                orderId: this.orderId,
                filename: filename
            };

            fetch(`${appDomain}/document`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    // let file = await new Blob([response], {type: "application/pdf"});
                    console.log(response.body.getReader());
                    const blob = new Blob()
                    return window.URL.createObjectURL(blob);
                })
                .catch(response => {
                        console.log('request failed: ' + `${appDomain}/document`, response.response);
                        console.log(response);
                        const blob = new Blob([response.response.body]);
                        return window.URL.createObjectURL(blob);
                    }
                );
            //
            //     const xhr = new XMLHttpRequest();
            //     xhr.open("POST", `${appDomain}/document`);
            //     xhr.responseType = "arraybuffer";
            //
            //     xhr.onload = function () {
            //         if (this.status === 200) {
            //             console.log(xhr);
            //             // const blob = new Blob([Buffer.from(xhr.response.body, 'binary')], {type: xhr.response.ContentType})
            //             // // const blob = new Blob([xhr.response], {type: "application/pdf"});
            //             // const objectUrl = URL.createObjectURL(blob);
            //             // window.open(objectUrl);
            //         }
            //     };
            //     xhr.send(JSON.stringify(data));
            // }


        }
    }
}