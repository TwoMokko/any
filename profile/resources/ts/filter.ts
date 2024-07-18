namespace Components {
    export class Filter {
        private select          : Select;
        private filterBtn       : FilterButtons;
        constructor(container: HTMLElement, func: Function, filterManager: FilterManager) {
            const filterWrap = createElement('form', 'filter', null, container);

            this.createElements(filterWrap);
            //
            this.select         = new Select(document.querySelector('[name="deliveryStatus"]'));
            this.filterBtn      = new FilterButtons(filterWrap, func, filterManager);

        }

        private createElements(container: HTMLElement): void {
            const dataForInput = [
                {
                    header: 'Поиск по номеру КП',
                    inputName: 'invoiceId',
                },
                {
                    header: 'Поиск по трек-номеру доставки',
                    inputName: 'shipmentNumber',
                },
                {
                    header: 'Поиск по номеру ТН',
                    inputName: 'factureNumber',
                }
            ];

            const dataForInputs = [
                {
                    header: 'Дата заказа',
                    className: 'input-wrap calendar',
                    inputName1: 'orderDateStart',
                    inputName2: 'orderDateEnd',
                    placeholder1: 'С',
                    placeholder2: 'По',
                    type: 'date'
                },
                {
                    header: 'Дата доставки',
                    className: 'input-wrap calendar',
                    inputName1: 'orderAmountStart',
                    inputName2: 'orderAmountEnd',
                    placeholder1: 'С',
                    placeholder2: 'По',
                    type: 'date'
                },
                {
                    header: 'Цена заказа (цена в валюте заказа)',
                    className: 'input-wrap',
                    inputName1: 'deliveryDateStart',
                    inputName2: 'deliveryDateEnd',
                    placeholder1: 'От',
                    placeholder2: 'До',
                    value: 0,
                    type: 'number'
                },
            ];

            for (const key in dataForInput) {
                const wrap = createElement('div', 'input-wrap', null, container);
                createElement('div', null, dataForInput[key].header, wrap);
                const inputWrap = createElement('div', null, null, wrap);
                const input = createElement('input', null, null, inputWrap);
                setAttributes(input, { 'type': 'text', 'name': dataForInput[key].inputName });
            }

            for (const key in dataForInputs) {
                const wrap = createElement('div', dataForInputs[key].className, null, container);
                createElement('div', null, dataForInputs[key].header, wrap);
                const inputWrap = createElement('div', null, null, wrap);
                const input1 = createElement('input', null, null, inputWrap);
                setAttributes(input1, { 'type': dataForInputs[key].type, 'name': dataForInputs[key].inputName1, 'placeholder': dataForInputs[key].placeholder1 });
                const input2 = createElement('input', null, null, inputWrap);
                setAttributes(input2, { 'type': dataForInputs[key].type, 'name': dataForInputs[key].inputName2, 'placeholder': dataForInputs[key].placeholder2 });
                if (dataForInputs[key].value) {
                    setAttributes(input1, {'value': dataForInputs[key].value});
                    setAttributes(input2, { 'value': dataForInputs[key].value });
                }
            }

            const wrap = createElement('div', 'input-wrap select', null, container);
            createElement('div', null, 'Поиск по статусу доставки', wrap);
            const selectWrap = createElement('div', null, null, wrap);
            const select = createElement('select', 'hide', null, selectWrap);
            setAttributes(select, { 'name': 'deliveryStatus' });

            setAttributes(createElement('option', null, 'выберите', select), { 'value': '' });
            setAttributes(createElement('option', null, 'неизвестный статус', select), { 'value': '1' });
            setAttributes(createElement('option', null, 'не отправлен', select), { 'value': '2' });
            setAttributes(createElement('option', null, 'груз принят', select), { 'value': '3' });
            setAttributes(createElement('option', null, 'в промежуточном пункте', select), { 'value': '4' });
            setAttributes(createElement('option', null, 'отправлен с промежуточного пункта', select), { 'value': '5' });
            setAttributes(createElement('option', null, 'в пути', select), { 'value': '6' });
        }

        public getData(): any {
            // let data = {};
            // data['email'] = 'aas@ms-service.su';
            // data['page'] = 1;
            // data['filters'] = {};

            // TODO: page = Components.Pagination.getPade()
            let data = {
                "email": "aas@ms-service.su",
                "page": 1,
                "filters": {
                    "invoiceId": "",
                    "orderDate": [ "", "" ],
                    "orderAmount": [ "", "" ],
                    "shipmentNumber": "",
                    "factureNumber": "",
                    "deliveryStatus": "",
                    "deliveryDate": [ "", "" ]
                },
                "sort": {
                    "field": "",
                    "order": ""
                }
            }

            data['filters']['invoiceId'] = document.getElementsByName('invoiceId')[0].value;
            data['filters']['shipmentNumber'] = document.getElementsByName('shipmentNumber')[0].value;
            data['filters']['factureNumber'] = document.getElementsByName('factureNumber')[0].value;
            data['filters']['deliveryStatus'] = document.getElementsByName('deliveryStatus')[0].value;
            data['filters']['orderDate'][0] = document.getElementsByName('orderDateStart')[0].value;
            data['filters']['orderDate'][1] = document.getElementsByName('orderDateEnd')[0].value;
            data['filters']['orderAmount'][0] = document.getElementsByName('orderAmountStart')[0].value;
            data['filters']['orderAmount'][1] = document.getElementsByName('orderAmountEnd')[0].value;
            data['filters']['deliveryDate'][0] = document.getElementsByName('deliveryDateStart')[0].value;
            data['filters']['deliveryDate'][1] = document.getElementsByName('deliveryDateEnd')[0].value;

            // data['sort'] = {};

            console.log({data});


            // console.log({data});

            return data;
        }

        public resetInputs(): void {
            document.getElementsByName('invoiceId')[0].value = '';
            document.getElementsByName('shipmentNumber')[0].value = '';
            document.getElementsByName('factureNumber')[0].value = '';
            document.getElementsByName('deliveryStatus')[0].value = '';
            document.getElementsByName('orderDateStart')[0].value = '';
            document.getElementsByName('orderDateEnd')[0].value = '';
            document.getElementsByName('orderAmountStart')[0].value = '';
            document.getElementsByName('orderAmountEnd')[0].value = '';
            document.getElementsByName('deliveryDateStart')[0].value = '';
            document.getElementsByName('deliveryDateEnd')[0].value = '';
        }
    }
}