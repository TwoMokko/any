type tableData = {
    orders: { [key: string]: orders },
    limit: number
}

interface orders {
        invoiceId: string,
        positions: number,
        orderAmount: string,
        manager: {
            id: number,
            name: string,
            surname: string,
        },
        paymentLink: string,
        paymentStatus: string,
        shipmentStatus: string,
        deliveryStatus: string,
        orderDate: dateForTable,
        shipmentDate: dateForTable,
        paymentDate: dateForTable,
        deliveryDate: dateForTable
}

type dateForTable = {
    date: string,
    timezone_type: number,
    timezone: string
}

const appDomain = 'https://localhost:8000/api';
// const appDomain = 'https://profile.fluid-line.ru:8001/api';

namespace Components {
    export class FilterManager {
        private sendData        : any;

        private filterState     : boolean = false;

        private filter          : Filter;

        private table           : Table;
        private pagination      : Pagination;
        constructor() {
            this.filter         = new Filter(document.querySelector('.with-nav'), this.redrawTableFromFilterBtn, this);
            new Manager();

            this.table          = new Table(document.querySelector('.with-nav'), Manager.open);
            this.pagination     = new Pagination(document.querySelector('main'), () => {
                this.updateData();
                this.send(this.sendData);
            });

            this.updateData();
            // TODO: вынести запросы в request
            // Base.Request.sendData(this.sendData, `${appDomain}/table`, 'POST', this.afterSend )
            this.send(this.sendData);
        }
        private redrawTableFromFilterBtn(btn: string, filterManager: FilterManager): void {
            filterManager.pagination.setPage(1);
            switch (btn) {
                case 'doReset':
                    if (!filterManager.filterState) {
                        filterManager.filter.resetInputs();
                        console.log('не отправлять запрос');
                        return;
                    }
                    filterManager.filterState = false;
                    filterManager.filter.resetInputs();
                    filterManager.updateData();
                    filterManager.send(filterManager.sendData);
                    console.log('сбросить, отправив запрос');
                    break;
                case 'doFilter':
                    filterManager.filterState = true;
                    filterManager.updateData();
                    filterManager.send(filterManager.sendData);
                    console.log('тут запрос с новыми данными')
                    break;
            }
        }

        private updateData(): void {
            this.sendData = this.filter.getData(this.pagination.getPage());
        }

        // public afterSend(result: tableData): void {
        //     this.table.redraw(result);
        //     this.pagination.redraw(result.limit);
        // }

        private send(data: any): void {
            console.log('send');
            console.log(data);
            fetch(`${appDomain}/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            .then(async response => {
                let result = await response.json();
                this.table.redraw(result);
                this.pagination.redraw(result.limit);
            });
        }
    }
}