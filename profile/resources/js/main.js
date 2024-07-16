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
const appDomain = 'https://localhost:8000/api';
var Components;
(function (Components) {
    class FilterManager {
        sendData;
        select;
        filterBtn;
        table;
        pagination;
        constructor() {
            this.select = new Components.Select(document.querySelector('[name="delivery_status"]'));
            this.filterBtn = new Components.FilterButtons(document.querySelector('form.filter'), () => { this.redrawTable(); });
            this.updateData();
            this.send(this.sendData);
        }
        redrawTable() {
            console.log('redraw table');
        }
        updateData() {
            // TODO: данные собирать, переписать это
            this.sendData = {
                'email': 'oleksyuk@camozzi.ru',
                'page': 1
            };
        }
        send(data) {
            fetch(`${appDomain}/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
                .then(async (response) => {
                let result = await response.json();
                console.log(result);
                this.table = new Components.Table(document.querySelector('.table'), result);
                this.pagination = new Components.Pagination(document.querySelector('main'));
            });
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
    // TODO: заменить email
    document.cookie = "user=oleksyuk@camozzi.ru";
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
        orderId = '';
        constructor() {
        }
        redraw(trTarget, data, orderId) {
            this.orderId = orderId;
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
            this.fillDocs(offerList, data.files['commercial']);
            if (data.files['shipment']) {
                const shipmentList = this.createDocs(invoiceDocs, 'Отгрузка');
                this.fillDocs(shipmentList, data.files['shipment']);
            }
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
                anchor.onclick = () => { this.downloadFile(list, data[key]); };
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
        }
        downloadFile(container, filename) {
            const anchor = createElement('a', 'hide', null, container);
            anchor.href = this.getFile(filename);
            anchor.download = filename;
            anchor.click();
        }
        getFile(filename) {
            const data = {
                orderId: this.orderId,
                filename: filename
            };
            //     fetch(`${appDomain}/document`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json;charset=utf-8',
            //         },
            //         body: JSON.stringify(data)
            //     })
            //         .then(async response => {
            //             let file = await new Blob([response], {type: "application/pdf"});
            //             console.log(response)
            //             return  window.URL.createObjectURL(file);
            //
            //         })
            //         .catch(response => { console.log('request failed: ' + `${appDomain}/document`); console.log(response); });
            //
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `${appDomain}/document`);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = new Blob([xhr.response], { type: "application/pdf" });
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
            };
            xhr.send(JSON.stringify(data));
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
                setAttributes(tr, { 'data-order-id': key });
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
                this.sendDataOnclickRow(trTarget);
                trTarget.classList.add('active');
                // this.redrawRow(event.target.closest('tr'), data);
            }
        }
        sendDataOnclickRow(tr) {
            tr.classList.remove('load');
            const orderId = tr.getAttribute('data-order-id');
            fetch(`${appDomain}/order/${orderId}`)
                .then(async (response) => {
                let result = await response.json();
                this.subTable.redraw(tr, result[orderId], orderId);
            });
        }
    }
    Components.Table = Table;
})(Components || (Components = {}));
//# sourceMappingURL=main.js.map