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
            this.createTotal(data, tBody);


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
                    if (key === 'price') {
                        createElement('td', null, data.items[item][key].toFixed(2), tr);
                        continue;
                    }
                    createElement('td', null, data.items[item][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor: HTMLAnchorElement = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img: HTMLImageElement = createElement('img', null, null, anchor);
                img.src = 'resources/img/download.svg';
            }
        }

        private createTotal(data, tBody: HTMLElement): void {
            // TODO высчитывать textContent

            console.log('data.items: ', data.items);
            let count = '';
            let price = 0;
            let fullPrice = 0;
            let shippedQuantity = '';

            let countThing = 0;
            let countMeter = 0;

            let shippedQuantityThing = 0;
            let shippedQuantityMeter = 0;
            for (const item of data.items) {
                price += item.price;
                fullPrice += item.fullPrice;

                const countArray = item.quantity.split(' ');
                if (countArray[1] === 'шт') countThing += Number(countArray[0]);
                if (countArray[1] === 'м') countMeter += Number(countArray[0]);

                const shippedQuantityArray = item.quantity.split(' ');
                if (shippedQuantityArray[1] === 'шт') shippedQuantityThing += Number(shippedQuantityArray[0]);
                if (shippedQuantityArray[1] === 'м') shippedQuantityMeter += Number(shippedQuantityArray[0]);
            }

            count = (countThing ? `${countThing}  шт` : '') + (countMeter ? `${countMeter} м` : '');
            shippedQuantity = (shippedQuantityThing ? `${shippedQuantityThing}  шт` : '') + (shippedQuantityMeter ? `${shippedQuantityMeter} м` : '');

            const lastTr = createElement('tr', 'total', null, tBody);
            createElement('td', null, 'Итого:', lastTr);
            createElement('td', null, null, lastTr);
            createElement('td', null, count, lastTr);
            createElement('td', null, price.toFixed(2).toString(), lastTr);
            createElement('td', null, fullPrice.toFixed(2).toString(), lastTr);
            createElement('td', null, shippedQuantity, lastTr);
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
                    this.getFile(data[key]);
                };
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
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
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(err => console.error('Error:', err));
        }
    }
}