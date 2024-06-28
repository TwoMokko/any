"use strict";
var Components;
(function (Components) {
    class FilterButtons {
        doFilter;
        doReset;
        callSend;
        constructor(container, func) {
            const filterWrap = createElement('div', 'filter-buttons', null, container);
            this.callSend = func;
            this.init(filterWrap);
            this.addEvents();
        }
        init(filterWrap) {
            this.doFilter = createElement('button', 'btn accent', 'Фильтровать', filterWrap);
            this.doFilter.setAttribute('type', 'submit');
            this.doReset = createElement('button', 'btn secondary', 'Сбросить', filterWrap);
        }
        addEvents() {
            this.doFilter.onclick = () => {
                Base.Request.sendForm(this.doFilter.closest('form'), 'POST', () => { console.log('do filter'); });
                this.callSend();
                return false;
            };
            this.doReset.onclick = () => {
                this.callSend();
                return false;
            };
        }
    }
    Components.FilterButtons = FilterButtons;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class FilterManager {
        select;
        filterBtn;
        table;
        pagination;
        constructor() {
            this.select = new Components.Select(document.querySelector('[name="delivery_status"]'));
            this.filterBtn = new Components.FilterButtons(document.querySelector('form.filter'), () => { this.redrawTable(); });
            this.table = new Components.Table(document.querySelector('.table'), this.getData());
            this.pagination = new Components.Pagination(document.querySelector('main'));
            // запрос и рисовать таблицу со всеми значениями?
        }
        redrawTable() {
            console.log('redraw table');
        }
        getData() {
            return {
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
            };
        }
    }
    Components.FilterManager = FilterManager;
})(Components || (Components = {}));
document.addEventListener("DOMContentLoaded", () => {
});
function showNavHeader(btn) {
    const dropList = btn.closest('.drop-wrap').querySelector('.drop-list');
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        dropList.classList.remove('active');
    }
    else {
        btn.classList.add('active');
        dropList.classList.add('active');
    }
}
function createElement(tagName, className, textContent, container) {
    let elem = document.createElement(tagName);
    if (className)
        elem.className = className;
    if (textContent)
        elem.textContent = textContent;
    if (textContent)
        elem.textContent = textContent;
    if (container)
        container.append(elem);
    return elem;
}
function setAttributes(element, attr) {
    for (const name in attr) {
        element.setAttribute(name, attr[name]);
    }
}
function setEmailFromCookie(input) {
    document.cookie = "user=test@mail.ru";
    input.value = getCookie('user');
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
var Components;
(function (Components) {
    class Pagination {
        constructor(container) {
            this.init(container);
        }
        init(container) {
            const wrap = createElement('div', 'pagination-wrap container', null, container);
            createElement('div', 'pagination-number', '1', wrap);
        }
        show() {
        }
        hide() {
        }
    }
    Components.Pagination = Pagination;
})(Components || (Components = {}));
var Base;
(function (Base) {
    class Request {
        static send(formData, url, method, func) {
            fetch(url, {
                method: method,
                body: formData
            })
                .then(async (response) => {
                let json = await response.json();
                Request.response(json, func);
            })
                .catch(response => { console.log('request failed: ' + url); console.log(response); });
        }
        static response(response, func) {
            switch (response.state) {
                case 'ok':
                    if (func)
                        func(response.body);
                    break;
                case 'error':
                    alert(response.body.message);
                    break;
            }
        }
        // public static send(formData: FormData, url: string, func?: Function): void {
        //     $.ajax({
        //         url				: url,
        //         method			: 'POST',
        //         dataType		: 'json',
        //         data 			: formData,
        //         contentType		: false,
        //         processData		: false,
        //         cache			: false,
        //         // beforeSend: function() { if (funcBeforeSend) funcBeforeSend(); },
        //         // complete: function() { if (funcComplete) funcComplete(); },
        //         success			: (response) => { if (func) func() },
        //         error			: (response) => { console.log('request failed: ' + url); console.log(response); }
        //     });
        // }
        // public static send(formData: FormData, url: string, method: string = 'POST', func?: Function): void {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open(method, url);
        //     xhr.send(formData);
        //     xhr.onload = () => func();
        //     xhr.onerror = () => alert('Ошибка соединения');
        // }
        static sendForm(form, method, func) {
            let url = form.getAttribute('action');
            let formData = new FormData(form);
            // console.log(formData);
            Request.send(formData, url, method, func);
        }
        static sendData(data, url, method, func) {
            let formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key].toString());
            }
            Request.send(formData, url, method, func);
        }
    }
    Base.Request = Request;
})(Base || (Base = {}));
var Components;
(function (Components) {
    class Select {
        sourceSelect;
        sourceOptions;
        header;
        list;
        isOpen; // флаг, состояние: открыт или закрыт селект
        isSelect; // флаг, состояние: выбрано что-то или нет
        duration; // анимация
        constructor(sourceSelect) {
            this.isSelect = false;
            this.isOpen = false;
            this.duration = 450;
            this.sourceSelect = sourceSelect;
            this.sourceOptions = sourceSelect.querySelectorAll('option');
            let headerText;
            this.sourceOptions.forEach((elem) => {
                if (elem.selected)
                    headerText = elem.textContent;
            });
            // sourceSelect.hide();
            /* Create Elements */
            const wrap = createElement('div', 'select-wrap', null, sourceSelect.closest('div'));
            this.header = createElement('div', 'new-select', headerText, wrap);
            this.list = createElement('div', 'new-select-list', null, wrap);
            this.createOptions();
            /* Building DOM */
            // wrap.append(
            //     this.header,
            //     this.list.append(
            //         this.getOptions()
            //     )
            // );
            /* Events */
            this.header.addEventListener('click', () => {
                if (this.header.classList.contains('disabled')) {
                    return;
                }
                this.switchSelect();
            });
            sourceSelect.after(wrap);
            this.slideToggle();
            // this.list.slideUp(0);
        }
        // public static factory($sourceSelect: JQuery): Select[] {
        //     let $out: Select[] = [];
        //     for (let i: number = 0; i < $sourceSelect.length; i++) {
        //         let select: Select = new Select($sourceSelect.eq(Number(i)));
        //         $out.push(select);
        //     }
        //     return $out;
        // }
        //
        createOptions() {
            this.sourceOptions.forEach((elem) => {
                const option = createElement('div', 'new-select-list-item', elem.textContent, this.list);
                option.addEventListener('click', (event) => {
                    console.log('event', typeof event);
                    this.doClickOnOption(event.target);
                });
            });
        }
        doClickOnOption(event) {
            this.header.textContent = event.textContent;
            this.sourceOptions.forEach((elem) => {
                if (elem.selected)
                    elem.selected = false;
                if (elem.textContent === event.textContent)
                    elem.selected = true;
            });
            this.slideToggle();
            // $sourceOption.trigger('change'); это если на change есть событие
        }
        //
        switchSelect() {
            this.isOpen ? this.close() : this.open();
        }
        open() {
            this.isOpen = true;
            this.header.classList.add('on');
            this.slideToggle();
        }
        close() {
            this.isOpen = false;
            this.header.classList.remove('on');
            this.slideToggle();
        }
        getIsSelect() {
            return this.isSelect;
        }
        slideToggle() {
            this.list.classList.toggle('hide');
        }
    }
    Components.Select = Select;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class SubTable {
        constructor() {
        }
        redraw(trTarget, data) {
            const nextTr = document.createElement('tr');
            nextTr.className = 'table-row-secondary';
            trTarget.after(nextTr);
            const td = createElement('td', null, null, nextTr);
            td.setAttribute('colspan', '14');
            const expanded = createElement('div', 'expanded', null, td);
            const tBody = this.createTable(expanded);
            this.fillTable(data, tBody);
            this.createTotal(tBody);
            const invoiceDocs = createElement('div', 'invoice-docs', null, expanded);
            // const btnWrap = createElement('div', null, null, invoiceDocs);
            // createElement('div', null, 'Документы по заказу', btnWrap);
            // const btnImgWrap = createElement('div', null, null, btnWrap);
            // createElement('img', null, null, btnImgWrap).src = 'resources/img/download.svg';
            const offerList = this.createDocs(invoiceDocs, 'Коммерческое предложение');
            const shipmentList = this.createDocs(invoiceDocs, 'Отгрузка');
            this.fillDocs(offerList, data.files.commercial);
            this.fillDocs(shipmentList, data.files.shipment);
        }
        createTable(expanded) {
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
            tHeadTextContent.forEach((item, i, thTopTextContent) => {
                createElement('th', null, item, tHeadRow);
            });
            return createElement('tbody', null, null, tableSecondary);
        }
        fillTable(data, tBody) {
            let num = 1;
            for (const item in data.items) {
                const tr = createElement('tr', null, null, tBody);
                createElement('td', null, String(num), tr);
                num++;
                for (let key in data.items[item]) {
                    const td = createElement('td', null, data.items[item][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img = createElement('img', null, null, anchor);
                img.src = 'resources/img/download.svg';
            }
        }
        createTotal(tBody) {
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
        createDocs(invoiceDocs, header) {
            const offerWrap = createElement('div', 'expanded-documents', null, invoiceDocs);
            createElement('div', null, header, offerWrap);
            return createElement('div', null, null, offerWrap);
        }
        fillDocs(list, data) {
            for (const key in data) {
                const anchor = createElement('a', null, null, list);
                anchor.onclick = () => { this.downloadFile(list); };
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
        }
        downloadFile(container) {
            const anchor = createElement('a', 'hide', null, container);
            anchor.href = this.getFile();
            anchor.download = 'filename.xlsx';
            anchor.click();
        }
        getFile() {
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
                .then(async (response) => {
                let file = await response.blob();
                return window.URL.createObjectURL(file);
            })
                .catch(response => { console.log('request failed: ' + 'http://localhost:8000/api/document'); console.log(response); });
        }
    }
    Components.SubTable = SubTable;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class Table {
        data;
        subTable;
        container;
        tbody;
        tr;
        constructor(container, data) {
            this.data = data;
            this.container = container;
            this.subTable = new Components.SubTable();
            this.init();
            this.redraw();
        }
        init() {
            const table = createElement('table', null, null, this.container);
            const tHead = createElement('thead', 'table-head', null, table);
            const trTop = createElement('tr', 'table-headrow', null, tHead);
            const trBot = createElement('tr', null, null, tHead);
            setAttributes(createElement('th', 'table-headcell', 'Номер КП', trTop), { 'rowspan': '2', 'data-column': 'invoiceId' });
            setAttributes(createElement('th', 'table-headcell', 'Позиции', trTop), { 'rowspan': '2', 'data-column': 'position' });
            setAttributes(createElement('th', 'table-headcell', 'Стоимость с НДС', trTop), { 'rowspan': '2', 'data-column': 'priceAll' });
            setAttributes(createElement('th', 'table-headcell', 'Менеджер', trTop), { 'rowspan': '2', 'data-column': 'manager' });
            setAttributes(createElement('th', 'table-headcell', 'Триггер письма', trTop), { 'rowspan': '2', 'data-column': 'triggerLetter' });
            setAttributes(createElement('th', 'table-headcell', 'Ссылка оплаты', trTop), { 'rowspan': '2', 'data-column': 'linkPayment' });
            // TODO: подумать, как выключать статус и дату, если нижних колонок нет, менять colspan
            setAttributes(createElement('th', 'table-headcell bordered', 'Статус', trTop), { 'colspan': '3', 'data-column': 'status' });
            setAttributes(createElement('th', 'table-headcell bordered', 'Дата', trTop), { 'colspan': '4', 'data-column': 'date' });
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
        redraw() {
            // очистить таблицу
            this.tbody.innerHTML = '';
            // наполнить таблицу,создав новые элементы
            for (const key in this.data.orders) {
                const tr = createElement('tr', 'table-row', null, this.tbody);
                setAttributes(createElement('td', 'table-cell', `${this.data.orders[key].invoiceId}`, tr), { 'data-column': 'invoiceId' });
                setAttributes(createElement('td', 'table-cell', `${this.data.orders[key].positions}`, tr), { 'data-column': 'position' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].orderAmount, tr), { 'data-column': 'priceAll' });
                const anchorWrap = createElement('td', 'table-cell', null, tr);
                setAttributes(anchorWrap, { 'data-column': 'manager' });
                const anchor = createElement('a', null, `${this.data.orders[key].manager.name} ${this.data.orders[key].manager.surname}`, anchorWrap);
                anchor.href = '';
                setAttributes(createElement('td', 'table-cell', 'дописать', tr), { 'data-column': 'triggerLetter' });
                setAttributes(createElement('td', 'table-cell', 'что делать с сылкой', tr), { 'data-column': 'linkPayment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].paymentStatus, tr), { 'data-column': 'statusPayment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].shipmentStatus, tr), { 'data-column': 'statusShipment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].deliveryStatus, tr), { 'data-column': 'statusDelivery' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].orderDate.date.split(' ', 2)[0], tr), { 'data-column': 'dateOrder' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].paymentDate.date.split(' ', 2)[0], tr), { 'data-column': 'datePayment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].shipmentDate.date.split(' ', 2)[0], tr), { 'data-column': 'dateShipment' });
                setAttributes(createElement('td', 'table-cell', this.data.orders[key].deliveryDate.date.split(' ', 2)[0], tr), { 'data-column': 'dateDelivery' });
                // const inputWrap = createElement('td', 'table-cell', '', tr);
                // setAttributes(inputWrap, { 'data-column': 'comment' })
                // const input = createElement('input', 'custom-value-field', null, inputWrap);
                // input.type = 'text';
                // input.name = 'name';
                tr.onclick = (event) => {
                    this.onclickTableRow(event);
                };
            }
            // навешать онклик на строки (труе фолс?)
        }
        sortOnDate() {
            console.log('sort on date');
        }
        onclickTableRow(event) {
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
                setTimeout(() => { this.sendDataOnclickRow('', {}, trTarget); }, 1000);
                trTarget.classList.add('active');
                // this.redrawRow(event.target.closest('tr'), data);
            }
        }
        sendDataOnclickRow(pathData, sendData, tr) {
            const dataRow = {
                "0008d69c-4010-11ee-82c1-00155d000a01": {
                    "items": [
                        {
                            "title": "ACLA-8M; Соединитель угловой из нержавеющей стали O.D. 8мм, серия CLA",
                            "quantity": "7 шт",
                            "price": 13412,
                            "fullPrice": 16094.4,
                            "shippedQuantity": "7 шт"
                        },
                        {
                            "title": "ACLA-12M; Соединитель угловой из нержавеющей стали O.D. 12мм, серия CLA",
                            "quantity": "73 шт",
                            "price": 269735,
                            "fullPrice": 323682,
                            "shippedQuantity": "73 шт"
                        },
                        {
                            "title": "ACMC-8M-4N; Штуцер с наружной резьбой из нержавеющей стали O.D. 8мм- NPT 1/4'', серия CMC",
                            "quantity": "4 шт",
                            "price": 4160,
                            "fullPrice": 4992,
                            "shippedQuantity": "4 шт"
                        },
                        {
                            "title": "CPC-8M; Коннектор из нержавеющей стали O.D. 8мм",
                            "quantity": "5 шт",
                            "price": 5200,
                            "fullPrice": 6240,
                            "shippedQuantity": "5 шт"
                        },
                        {
                            "title": "AOV20CS04-S; вентиль прямой HiFlux с пневмоприводом, O.D. 1/4\", давление 1378 бар, нормально-закрытый",
                            "quantity": "1 шт",
                            "price": 76329,
                            "fullPrice": 91594.8,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "AOV20OS04-S; вентиль прямой HiFlux с пневмоприводом, O.D. 1/4\", давление 1378 бар, нормально-открытый",
                            "quantity": "1 шт",
                            "price": 90436.5,
                            "fullPrice": 108523.8,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "VCVH2-H-8M-1/3; Обратный клапан серии CVH из нержавеющей стали S316 , Hy-Lok 8мм - Hy-Lok 8мм",
                            "quantity": "1 шт",
                            "price": 9055,
                            "fullPrice": 10866,
                            "shippedQuantity": "1 шт"
                        },
                        {
                            "title": "VCVH2-H-12M-1/3; Обратный клапан серии CVH из нержавеющей стали S316 , Hy-Lok 12мм - Hy-Lok 12мм",
                            "quantity": "10 шт",
                            "price": 102070,
                            "fullPrice": 122484,
                            "shippedQuantity": "10 шт"
                        },
                        {
                            "title": "RV2-H-12M-C; Предохранительный клапан серии RV из нержавеющей стали S316 , Hy-Lok 12мм - Hy-Lok 12мм",
                            "quantity": "4 шт",
                            "price": 115016.00000000001,
                            "fullPrice": 138019.2,
                            "shippedQuantity": "4 шт"
                        },
                        {
                            "title": "CPC-12M; Коннектор из нержавеющей стали O.D. 12мм",
                            "quantity": "66 шт",
                            "price": 93390,
                            "fullPrice": 112068,
                            "shippedQuantity": "66 шт"
                        },
                        {
                            "title": "VBZY-10-FN-AEB-220AC; Шаровой кран из нержавеющей стали, Ду10мм, подсоединение внутренняя резьба NPT 3/8\" внутр, с электроприводом HQ-004",
                            "quantity": "10 шт",
                            "price": 335016,
                            "fullPrice": 402019.2,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "DR60-A200-1; Pressure Regulator, Регулятор давления",
                            "quantity": "1 шт",
                            "price": 18563,
                            "fullPrice": 22275.6,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "DR80-A-S-150-A-1-O; Регулятор давления серии DR80 из нержавеющей стали, Рвх = 420 бар, Рвых = 150 бар, без портов под манометр, подсоединение 1/4\"FNPT, коэффициент расхода CV= 0.2",
                            "quantity": "4 шт",
                            "price": 544500,
                            "fullPrice": 653400,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "FT20TS04; тройник HiFlux O.D. 1/4\", давление 1378 бар",
                            "quantity": "4 шт",
                            "price": 31482,
                            "fullPrice": 37778.4,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "ACTA-12M; Тройник равнопроходной из нержавеющей стали O.D. 12мм, серия CTA",
                            "quantity": "38 шт",
                            "price": 194674,
                            "fullPrice": 233608.8,
                            "shippedQuantity": "38 шт"
                        },
                        {
                            "title": "FT20ES04; Угловой фитинг Hiflux 1379 бар",
                            "quantity": "18 шт",
                            "price": 104247,
                            "fullPrice": 125096.4,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "A060M4/060M4; фитинг высокого давления, наруж.- наруж. HiFlux O.D. 1/4\", давление 4137 бар",
                            "quantity": "5 шт",
                            "price": 37867.5,
                            "fullPrice": 45441,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "ASF-12M-M20; Штуцер O.D. 12мм - накидная гайка M20x1.5",
                            "quantity": "12 шт",
                            "price": 38847.600000000006,
                            "fullPrice": 46617.12,
                            "shippedQuantity": "0 шт"
                        },
                        {
                            "title": "ACMC-6-4N; Штуцер с наружной резьбой из нержавеющей стали O.D. 3/8''- NPT 1/4'', серия CMC",
                            "quantity": "5 шт",
                            "price": 5575,
                            "fullPrice": 6690,
                            "shippedQuantity": "5 шт"
                        },
                        {
                            "title": "ACMC-12M-4N; Штуцер с наружной резьбой из нержавеющей стали O.D. 12мм- NPT 1/4'', серия CMC",
                            "quantity": "15 шт",
                            "price": 24435,
                            "fullPrice": 29322,
                            "shippedQuantity": "15 шт"
                        },
                        {
                            "title": "ACMC-12M-6N; Штуцер с наружной резьбой из нержавеющей стали O.D. 12мм- NPT 3/8'', серия CMC",
                            "quantity": "20 шт",
                            "price": 33580,
                            "fullPrice": 40296,
                            "shippedQuantity": "20 шт"
                        },
                        {
                            "title": "ACAL-12M; Адаптер угловой из нержавеющей стали O.D. 12мм, серия CAL",
                            "quantity": "24 шт",
                            "price": 98880,
                            "fullPrice": 118656,
                            "shippedQuantity": "24 шт"
                        },
                        {
                            "title": "CAF-12M-8G; Адаптер с внутренней резьбой из нержавеющей стали O.D. 12мм - G 1/2''",
                            "quantity": "7 шт",
                            "price": 18620,
                            "fullPrice": 22344,
                            "shippedQuantity": "0 шт"
                        }
                    ],
                    "files": {
                        "commercial": [
                            "Коммерческое предложение и счет на оплату №31904 от 21 августа 2023 г..zip",
                            "Коммерческое предложение и счет на оплату №31904 от 21 августа 2023 г..pdf",
                            "Коммерческое предложение и счет на оплату №31904 от 21 августа 2023 г..xlsx"
                        ],
                        "shipment": [
                            "Заказ покупателя 00000031904 от 21.08.2023.zip",
                            "Реализация товаров и услуг 00000013914 от 28.09.2023.xlsx",
                            "Счет-фактура выданный 000000022995 от 28.09.2023.xlsx"
                        ]
                    }
                }
            };
            tr.classList.remove('load');
            this.subTable.redraw(tr, dataRow['0008d69c-4010-11ee-82c1-00155d000a01']);
            // fetch(pathData, {
            //     method: 'POST',
            //     body: JSON.stringify(sendData),
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            // })
            //     .then(async response => {
            //         const dataRow = response.json();
            //         tr.classList.remove('load');
            //
            //         this.redrawRow(tr, dataRow);
            //         console.log('SUCCESS:');
            //     })
            //     .catch(
            //         response => { console.log('request failed'); console.log('resp search', response); }
            //     );
            // $.ajax({
            //     type: 'POST',
            //     url: pathData,
            //     data: JSON.stringify(sendData),
            //     dataType: 'json',
            //     success: (dataRow): void => {
            //         this.redrawRow(tr, dataRow);
            //
            //         console.log('SUCCESS:');
            //     },
            //     error: (jqXHR, textStatus, errorThrown): void => {
            //         console.log('ERROR: ' + textStatus + ", " + errorThrown);
            //         console.log(jqXHR);
            //     }
            // });
        }
    }
    Components.Table = Table;
})(Components || (Components = {}));
//# sourceMappingURL=main.js.map