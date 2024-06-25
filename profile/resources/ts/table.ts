namespace Components {
    export class Table {
        private data                : tableData;

        private container           : HTMLElement;
        private tbody               : HTMLElement;
        private tr                  : HTMLTableRowElement;
        constructor(container: HTMLElement, data: tableData) {
            this.data               = data;
            this.container          = container;
            this.init();
            this.redraw();
        }

        private init(): void {
            const table = createElement('table', null, null, this.container);
            const tHead = createElement('thead', 'table-head', null, table);
            const trTop = createElement('tr', 'table-headrow', null, tHead);
            const trBot = createElement('tr', null, null, tHead);

            createElement('th', 'table-headcell', 'Позиции', trTop).setAttribute('rowspan', '2');
            createElement('th', 'table-headcell', 'Стоимость с НДС', trTop).setAttribute('rowspan', '2');
            createElement('th', 'table-headcell', 'Менеджер', trTop).setAttribute('rowspan', '2');
            createElement('th', 'table-headcell', 'Триггер письма', trTop).setAttribute('rowspan', '2');
            createElement('th', 'table-headcell', 'Ссылка оплаты', trTop).setAttribute('rowspan', '2');
            createElement('th', 'table-headcell bordered', 'Статус', trTop).setAttribute('colspan', '2');
            createElement('th', 'table-headcell bordered', 'Дата', trTop).setAttribute('colspan', '3');
            createElement('th', 'table-headcell', 'Комментарии', trTop).setAttribute('rowspan', '2');

            createElement('th', 'table-headcell', 'Оплаты', trBot);
            createElement('th', 'table-headcell', 'Отгрузки', trBot);
            createElement('th', 'table-headcell sort', 'Заказа', trBot);
            createElement('th', 'table-headcell sort', 'Отгрузки', trBot);
            createElement('th', 'table-headcell sort', 'Оплаты', trBot);

            this.tbody = createElement('tbody', null, null, table);
        }

        public redraw(): void {
            const data = {
                table: [
                     {
                        number: 1,
                        name: 'name',
                        count: '5 count',
                        price: '18 800',
                        priceNDS: '90 200',
                        otgruz: '0 count',
                        link: 'link',
                    },
                     {
                        number: 2,
                        name: 'name 2',
                        count: '5 count 2',
                        price: '18 802',
                        priceNDS: '90 202',
                        otgruz: '0 count 2',
                        link: 'link 2',
                    },
                ],
                files: [
                    'pdf',
                    'txt',
                    'xlsx'
                ],
                filename: 'filename',
                link: 'lin filame'
            }

            // очистить таблицу
            this.tbody.innerHTML = '';

            // наполнить таблицу,создав новые элементы
            for (const key in this.data.orders) {
                console.log(key);
                console.log(this.data.orders[key]);
                const tr = createElement('tr', 'table-row', null, this.tbody);

                createElement('td', 'table-cell', `${this.data.orders[key].positions}`, tr);
                createElement('td', 'table-cell', this.data.orders[key].orderAmount, tr);
                const anchorWrap = createElement('td', 'table-cell', null, tr);
                const anchor = createElement('a', null, `${this.data.orders[key].manager.name} ${this.data.orders[key].manager.surname}`, anchorWrap);
                anchor.href = '';
                createElement('td', 'table-cell', '', tr);
                createElement('td', 'table-cell', '', tr);
                createElement('td', 'table-cell', this.data.orders[key].paymentStatus, tr);
                createElement('td', 'table-cell', this.data.orders[key].shipmentStatus, tr);
                createElement('td', 'table-cell', this.data.orders[key].orderDate.date.split(' ', 2)[0], tr);
                createElement('td', 'table-cell', '', tr);
                createElement('td', 'table-cell', '', tr);
                const inputWrap = createElement('td', 'table-cell', '', tr);
                const input = createElement('input', 'custom-value-field', null, inputWrap);
                input.type = 'text';
                input.name = 'name';

                tr.onclick = (event): void => {
                    console.log(event.target.closest('tr'));
                    this.redrawRow(event.target.closest('tr'), data);
                };
            }

            // навешать онклик на строки (труе фолс?)
        }

        public redrawRow(trTarget: HTMLTableRowElement, data): void {
            if (this.tr) this.tr.remove();
            this.tr = document.createElement('tr');
            this.tr.className = 'table-row-secondary';
            trTarget.after(this.tr);
            const td = createElement('td', null, null, this.tr);
            td.setAttribute('colspan', '14');

            const expanded = createElement('div', 'expanded', null, td);

            // TODO вынести создание левой части
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

            const tBody = createElement('tbody', null, null, tableSecondary);

            // TODO работа с данными, наполнение таблицы, вынести этот кусок кода в отдельный метод
            for ( let i = 0; i < data.table.length; i++ ) {
                const tr = createElement('tr', null, null, tBody);
                for ( let key in data.table[i]) {
                    const td = createElement('td', null, data.table[i][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor: HTMLAnchorElement = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img: HTMLImageElement = createElement('img', null, null, anchor);
                img.src = 'resources/img/download.svg';
            }

            // TODO вынести в метод, высчитывать textContent
            const lastTr = createElement('tr', 'total', null, tBody);
            createElement('td', null, 'Итого:', lastTr);
            createElement('td', null, null, lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, '', lastTr);
            createElement('td', null, null, lastTr);


            // TODO вынести создание правой части
            const invoiceDocs = createElement('div', 'invoice-docs', null, expanded);

            const btnWrap = createElement('div', null, null, invoiceDocs);
            createElement('div', null, 'Документы по заказу', btnWrap);
            const btnImgWrap = createElement('div', null, null, btnWrap);
            createElement('img', null, null, btnImgWrap).src = 'resources/img/download.svg';

            const offerWrap = createElement('div', null, null, invoiceDocs);
            createElement('div', null, 'Коммерческое предложение', offerWrap);
            const offerList = createElement('div', null, null, offerWrap);

            // TODO работа с данными
            for (let i = 0; i < 4; i++) {
                const anchor = createElement('a', null, null, offerList);
                anchor.href = 'link';
                createElement('div', null, `${i + 1}.`, anchor);
                createElement('div', null, 'txt', anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
        }

        private sortOnDate(): void {
            console.log('sort on date');
        }
    }
}