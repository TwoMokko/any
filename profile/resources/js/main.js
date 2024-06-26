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
                    const trTarget = event.target.closest('tr');
                    trTarget.classList.add('load');
                    setTimeout(() => { this.sendDataOnclickRow('', {}, trTarget); }, 1000);
                    // this.redrawRow(event.target.closest('tr'), data);
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
            const tBody = this.createSubRowTable(expanded);
            this.fillSubRowTable(data, tBody);
            this.createSubRowTotal(tBody);
            const invoiceDocs = createElement('div', 'invoice-docs', null, expanded);
            const btnWrap = createElement('div', null, null, invoiceDocs);
            createElement('div', null, 'Документы по заказу', btnWrap);
            const btnImgWrap = createElement('div', null, null, btnWrap);
            createElement('img', null, null, btnImgWrap).src = 'resources/img/download.svg';
            const offerList = this.createSubRowDocs(invoiceDocs, 'Коммерческое предложение');
            const shipmentList = this.createSubRowDocs(invoiceDocs, 'Отгрузка');
            this.fillSubRowDocs(offerList, data.files.commercial);
            this.fillSubRowDocs(shipmentList, data.files.shipment);
        }
        sortOnDate() {
            console.log('sort on date');
        }
        createSubRowTable(expanded) {
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
        fillSubRowTable(data, tBody) {
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
        createSubRowTotal(tBody) {
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
        createSubRowDocs(invoiceDocs, header) {
            const offerWrap = createElement('div', 'expanded-documents', null, invoiceDocs);
            createElement('div', null, header, offerWrap);
            return createElement('div', null, null, offerWrap);
        }
        fillSubRowDocs(list, data) {
            for (const key in data) {
                const anchor = createElement('a', null, null, list);
                anchor.href = 'link';
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
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
            this.redrawRow(tr, dataRow['0008d69c-4010-11ee-82c1-00155d000a01']);
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