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

namespace Components {
    export class FilterManager {
        private sendData            : any;

        private select          : Select;
        private filterBtn       : FilterButtons;
        private table           : Table;
        private pagination      : Pagination;
        constructor() {
            this.select = new Components.Select(document.querySelector('[name="delivery_status"]'));
            this.filterBtn = new FilterButtons(document.querySelector('form.filter'), () => { this.redrawTable(); });

            this.updateData();
            this.send(this.sendData);
        }
        private redrawTable(): void {
            console.log('redraw table');
        }

        private updateData(): void {
            // TODO: данные собирать, переписать это
            this. sendData = {
                'email': 'oleksyuk@camozzi.ru',
                'page': 1
            }
        }

        private send(data: any): void {
            fetch(`${appDomain}/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            .then(async response => {
                let result = await response.json();
                console.log(result);
                this.table = new Table(document.querySelector('.table'), result);
                this.pagination = new Pagination(document.querySelector('main'));
            });
        }
    }
}