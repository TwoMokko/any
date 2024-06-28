namespace Components {
    import Request = Base.Request;

    export class SubTable {
        constructor() {

        }

        public redraw(trTarget: HTMLElement, data): void {
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
            const shipmentList: HTMLElement = this.createDocs(invoiceDocs, 'Отгрузка');
            this.fillDocs(offerList, data.files.commercial);
            this.fillDocs(shipmentList, data.files.shipment);
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
                for ( let key in data.items[item]) {

                    const td = createElement('td', null, data.items[item][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor: HTMLAnchorElement = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img: HTMLImageElement = createElement('img', null, null, anchor);
                img.src = 'resources/img/download.svg';
            }
        }

        private createTotal(tBody: HTMLElement): void{
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
                anchor.onclick = () => { this.downloadFile(list); };
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
        }

        private downloadFile(container: HTMLElement): void {
            const anchor = createElement('a', 'hide', null, container);
            anchor.href = this.getFile();
            anchor.download = 'filename.xlsx';
            anchor.click();
        }

        private getFile() {
            const data = {
                "orderId": "0008d69c-4010-11ee-82c1-00155d000a01",
                "filename": "Коммерческое предложение и счет на оплату №31904 от 21 августа 2023 г..xlsx"
            };

            fetch('http://localhost:8000/api/document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    let file = await response.blob();
                    return  window.URL.createObjectURL(file);

                })
                .catch(response => { console.log('request failed: ' + 'http://localhost:8000/api/document'); console.log(response); });

        }
    }
}