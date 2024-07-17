namespace Components {
    export class Table {
        private data                        : tableData;

        private subTable                    : SubTable;

        private readonly container          : HTMLElement;
        private tbody                       : HTMLElement;
        private tr                          : HTMLTableRowElement;

        private readonly callbackManager    : Function;
        constructor(container: HTMLElement, data: tableData, callbackManager: Function) {
            this.data                       = data;
            this.container                  = container;
            this.subTable                   = new SubTable();
            this.callbackManager            = callbackManager;

            this.init();
            this.redraw();
        }

        private init(): void {
            const table = createElement('table', null, null, this.container);
            const tHead = createElement('thead', 'table-head', null, table);
            const trTop = createElement('tr', 'table-headrow', null, tHead);
            const trBot = createElement('tr', null, null, tHead);

            setAttributes(createElement('th', 'table-headcell', 'Номер КП', trTop), { 'rowspan': '2', 'data-column': 'invoiceId' });
            setAttributes(createElement('th', 'table-headcell', 'Позиции', trTop), { 'rowspan': '2', 'data-column': 'position' });
            setAttributes(createElement('th', 'table-headcell', 'Стоимость с НДС', trTop), { 'rowspan': '2', 'data-column': 'priceAll' });
            setAttributes(createElement('th', 'table-headcell', 'Менеджер', trTop), { 'rowspan': '2', 'data-column': 'manager' });
            setAttributes(createElement('th', 'table-headcell', 'Триггер письма', trTop), { 'rowspan': '2', 'data-column': 'triggerLetter' });
            setAttributes(createElement('th', 'table-headcell', 'Ссылка оплаты', trTop), {'rowspan': '2', 'data-column': 'linkPayment' });

            // TODO: подумать, как выключать статус и дату, если нижних колонок нет, менять colspan
            setAttributes(createElement('th', 'table-headcell bordered', 'Статус', trTop), {'colspan': '3', 'data-column': 'status' });
            setAttributes(createElement('th', 'table-headcell bordered', 'Дата', trTop), {'colspan': '4', 'data-column': 'date' });

            // setAttributes(createElement('th', 'table-headcell', 'Комментарии', trTop), { 'rowspan': '2', 'data-column': 'comment' });

            setAttributes(createElement('th', 'table-headcell', 'Оплаты', trBot), { 'data-colunm': 'statusPayment' });
            setAttributes(createElement('th', 'table-headcell', 'Отгрузки', trBot), { 'data-colunm': 'statusShipment' });
            setAttributes(createElement('th', 'table-headcell', 'Доставки', trBot), { 'data-colunm': 'statusDelivery' });
            setAttributes(createElement('th', 'table-headcell sort', 'Заказа', trBot), { 'data-colunm': 'dateOrder' });
            setAttributes(createElement('th', 'table-headcell sort', 'Отгрузки', trBot), { 'data-colunm': 'datePayment' });
            setAttributes(createElement('th', 'table-headcell sort', 'Оплаты', trBot), { 'data-colunm': 'dateShipment' });
            setAttributes(createElement('th', 'table-headcell sort', 'Доставки', trBot), { 'data-colunm': 'dateDelivery' });

            this.tbody = createElement('tbody', null, null, table);
        }

        public redraw(): void {
            // очистить таблицу
            this.tbody.innerHTML = '';

            // наполнить таблицу,создав новые элементы
            for (const key in this.data.orders) {
                const tr = createElement('tr', 'table-row', null, this.tbody);
                setAttributes(tr, { 'data-order-id': key });

                setAttributes(createElement('td', 'table-cell', `${this.data.orders[key].invoiceId}`, tr), { 'data-column': 'invoiceId' });
                setAttributes(createElement('td', 'table-cell', `${this.data.orders[key].positions}`, tr), { 'data-column': 'position' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].orderAmount, tr), { 'data-column': 'priceAll' });

                const anchorWrap = createElement('td', 'table-cell table-cell-manager', `${this.data.orders[key].manager.name} ${this.data.orders[key].manager.surname}`, tr);
                setAttributes(anchorWrap, { 'data-column': 'manager' });
                anchorWrap.addEventListener('click', (event: Event) => { event.stopPropagation(); this.callbackManager(this.data.orders[key].manager.id); })

                setAttributes(createElement('td', 'table-cell', 'дописать', tr), { 'data-column': 'triggerLetter' });

                const linkWrap = createElement('td', 'table-cell', null, tr);
                setAttributes(linkWrap, { 'data-column': 'linkPayment' });
                const link = createElement('a', 'table-cell-link', null, linkWrap);
                link.href = this.data.orders[key].paymentLink;
                setAttributes(link, { 'target': '_blank' });
                link.addEventListener('click', (event: Event) => { event.stopPropagation(); });

                setAttributes(createElement('td', 'table-cell', this.data.orders[key].paymentStatus, tr), { 'data-column': 'statusPayment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].shipmentStatus, tr), { 'data-column': 'statusShipment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].deliveryStatus, tr), { 'data-column': 'statusDelivery' });

                const orderDate = this.data.orders[key].orderDate ? this.data.orders[key].orderDate.date.split(' ', 2)[0] : '';
                const paymentDate = this.data.orders[key].paymentDate ? this.data.orders[key].paymentDate.date.split(' ', 2)[0] : '';
                const shipmentDate = this.data.orders[key].shipmentDate ? this.data.orders[key].shipmentDate.date.split(' ', 2)[0] : '';
                const deliveryDate = this.data.orders[key].deliveryDate ? this.data.orders[key].deliveryDate.date.split(' ', 2)[0] : '';

                setAttributes(createElement('td', 'table-cell', orderDate, tr), { 'data-column': 'dateOrder' });
                setAttributes(createElement('td', 'table-cell', paymentDate, tr), { 'data-column': 'datePayment' });
                setAttributes(createElement('td', 'table-cell', shipmentDate, tr), { 'data-column': 'dateShipment' });
                setAttributes(createElement('td', 'table-cell', deliveryDate, tr), { 'data-column': 'dateDelivery' });

                // const inputWrap = createElement('td', 'table-cell', '', tr);
                // setAttributes(inputWrap, { 'data-column': 'comment' })
                // const input = createElement('input', 'custom-value-field', null, inputWrap);
                // input.type = 'text';
                // input.name = 'name';

                tr.onclick = (event): void => {
                    this.onclickTableRow(event);
                };
            }
        }

        private sortOnDate(): void {
            console.log('sort on date');
        }

        private onclickTableRow(event: any): void {
            // TODO: вынести логику в sub table
            const trTarget = event.target.closest('tr');
            const nextTr = (trTarget.nextSibling) ? trTarget.nextSibling : null;

            if (nextTr && nextTr.classList.contains('table-row-secondary')) {
                if (nextTr.classList.contains('hide')) {
                    nextTr.classList.remove('hide');
                    trTarget.classList.add('active');
                }
                else {
                    nextTr.classList.add('hide');
                    trTarget.classList.remove('active');
                }
            }
            else {
                trTarget.classList.add('load');
                this.sendDataOnclickRow(trTarget);
                trTarget.classList.add('active');
                // this.redrawRow(event.target.closest('tr'), data);
            }
        }

        private sendDataOnclickRow(tr: HTMLElement): void {
            const orderId = tr.getAttribute('data-order-id');

            fetch(`${appDomain}/order/${orderId}`)
                .then(async response => {
                    tr.classList.remove('load');
                    let result = await response.json();
                    this.subTable.redraw(tr, result[orderId], orderId);
                })
        }
    }
}