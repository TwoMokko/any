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

namespace Components {
    export class FilterManager {
        private select          : Select;
        private filterBtn       : FilterButtons;
        private table           : Table;
        constructor() {
            this.select = new Components.Select(document.querySelector('[name="delivery_status"]'));
            this.filterBtn = new FilterButtons(document.querySelector('form.filter'), () => { this.redrawTable(); });
            this.table = new Table(document.querySelector('.table'), this.getData());
            // запрос и рисовать таблицу со всеми значениями?
        }
        private redrawTable(): void {
            console.log('redraw table');
        }

        private getData(): tableData {
            return  {
                "orders": {
                    "e6ba4f9b-dd1a-11ed-82ba-00155d000a01": {
                        "invoiceId": "19984",
                        "positions": 26,
                        "orderAmount": "1 065 121.20 RUB",
                        "manager": {
                            "id": 2,
                            "name": "Евгения",
                            "surname": "Каманина"
                        },
                        "paymentLink": "https://orders.cloudpayments.ru/d/AbiyfsoQ22QkqpTI",
                        "paymentStatus": "Оплачен",
                        "shipmentStatus": "Отгружен",
                        "deliveryStatus": "груз доставлен",
                        "orderDate": {
                            "date": "2023-04-17 00:00:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "shipmentDate": {
                            "date": "2023-06-14 16:03:23.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "paymentDate": {
                            "date": "2023-06-13 00:00:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "deliveryDate": {
                            "date": "2023-06-19 13:10:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        }
                    },
                    "e6ba4f9b-dd1a-11ed-82ba-00155d000fa01": {
                        "invoiceId": "19984",
                        "positions": 26,
                        "orderAmount": "1 065 121.20 RUB",
                        "manager": {
                            "id": 2,
                            "name": "Евгения",
                            "surname": "Каманина"
                        },
                        "paymentLink": "https://orders.cloudpayments.ru/d/AbiyfsoQ22QkqpTI",
                        "paymentStatus": "Оплачен",
                        "shipmentStatus": "Отгружен",
                        "deliveryStatus": "груз доставлен",
                        "orderDate": {
                            "date": "2023-04-17 00:00:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "shipmentDate": {
                            "date": "2023-06-14 16:03:23.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "paymentDate": {
                            "date": "2023-06-13 00:00:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "deliveryDate": {
                            "date": "2023-06-19 13:10:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        }
                    },
                    "e6ba4f9b-dd1a-11ed-82ba-00155d000a055": {
                        "invoiceId": "19984",
                        "positions": 26,
                        "orderAmount": "1 065 121.20 RUB",
                        "manager": {
                            "id": 2,
                            "name": "Евгения",
                            "surname": "Каманина"
                        },
                        "paymentLink": "https://orders.cloudpayments.ru/d/AbiyfsoQ22QkqpTI",
                        "paymentStatus": "Оплачен",
                        "shipmentStatus": "Отгружен",
                        "deliveryStatus": "груз доставлен",
                        "orderDate": {
                            "date": "2023-04-17 00:00:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "shipmentDate": {
                            "date": "2023-06-14 16:03:23.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "paymentDate": {
                            "date": "2023-06-13 00:00:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        },
                        "deliveryDate": {
                            "date": "2023-06-19 13:10:00.000000",
                            "timezone_type": 3,
                            "timezone": "Europe/Berlin"
                        }
                    }
                },
                "limit": 1
            }
        }
    }
}