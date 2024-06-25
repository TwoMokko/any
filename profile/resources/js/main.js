"use strict";
var Components;
(function (Components) {
    class FilterManager {
        select;
        table;
        constructor() {
            this.select = new Components.Select(document.querySelector('[name="delivery_status"]'));
            this.table = new Components.Table(document.querySelector('.table'), this.getData());
            // запрос и рисовать таблицу со всеми значениями?
        }
        redrawTable() {
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
function setEmailFromCookie(input) {
    document.cookie = "user=test@mail.ru";
    input.value = getCookie('user');
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
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
            console.log(formData);
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
    class Table {
        data;
        container;
        tbody;
        tr;
        constructor(container, data) {
            this.data = data;
            this.container = container;
            this.init();
            this.redraw();
        }
        init() {
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
        redraw() {
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
            };
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
                tr.onclick = (event) => {
                    console.log(event.target.closest('tr'));
                    this.redrawRow(event.target.closest('tr'), data);
                };
            }
            // навешать онклик на строки (труе фолс?)
        }
        redrawRow(trTarget, data) {
            if (this.tr)
                this.tr.remove();
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
            tHeadTextContent.forEach((item, i, thTopTextContent) => {
                createElement('th', null, item, tHeadRow);
            });
            const tBody = createElement('tbody', null, null, tableSecondary);
            // TODO работа с данными, наполнение таблицы, вынести этот кусок кода в отдельный метод
            for (let i = 0; i < data.table.length; i++) {
                const tr = createElement('tr', null, null, tBody);
                for (let key in data.table[i]) {
                    const td = createElement('td', null, data.table[i][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img = createElement('img', null, null, anchor);
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
        sortOnDate() {
            console.log('sort on date');
        }
    }
    Components.Table = Table;
})(Components || (Components = {}));
//# sourceMappingURL=main.js.map