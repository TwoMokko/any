const dataAttrForTable = 'data-db';

namespace Components {
    export class Table {
        private wrap        : HTMLElement;
        private table       : HTMLTableElement;
        private tbody       : HTMLElement;
        constructor(wrap: HTMLElement) {
            this.init(wrap);
        }

        private init(wrap: HTMLElement): void {
            this.wrap       = wrap;
            this.table      = createElement('table', 'table', null, wrap);

            const thead     = createElement('thead', null, null, this.table);
            const tr        = createElement('tr', null, null, thead);

            /* TODO: нужен ли атрибут для создания элементов в нужном месте */
            createElement('th', null, 'Артикул', tr).setAttribute(dataAttrForTable, 'vendorCode');
            createElement('th', null, 'Рейтинг типа', tr).setAttribute(dataAttrForTable, 'typeRating');
            createElement('th', null, 'Рейтинг самого товара', tr).setAttribute(dataAttrForTable, 'rating');
            createElement('th', null, 'Количество заказов', tr).setAttribute(dataAttrForTable, 'numberOfOrders');
            createElement('th', null, 'Количество купленных', tr).setAttribute(dataAttrForTable, 'purchasedQuantity');
            createElement('th', null, 'Цена', tr).setAttribute(dataAttrForTable, 'price');

            this.tbody = createElement('tbody', null, null, this.table);
        }

        public hide(): void {
            if (!this.wrap.classList.contains('hide')) this.wrap.classList.add('hide');
        }

        public show(): void {
            if (this.wrap.classList.contains('hide')) this.wrap.classList.remove('hide');
        }

        public redraw(soldProducts) {
            this.tbody.innerHTML = '';

            if (!soldProducts.length) {
                this.hide();
                return;
            }

            this.show();

            for (const item of soldProducts) {
                const tr = createElement('tr', null, null, this.tbody);

                // console.log(dataRespElement);
                createElement('td', null, item['vendorCode'], tr)
                createElement('td', null, item['typeRating'], tr)
                createElement('td', null, item['rating'], tr)
                createElement('td', null, item['numberOfOrders'], tr)
                createElement('td', null, item['purchasedQuantity'], tr)
                createElement('td', null, item['price'], tr)

                /* TODO: может быть сделать циклом формирование tr исходя из данных */
                // for (const key in dataRespElement) {
                //     createElement('td', null, dataRespElement[key], tr);
                // }
            }
        }
    }
}