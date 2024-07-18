"use strict";
var Components;
(function (Components) {
    class FilterButtons {
        doFilter;
        doReset;
        callSend;
        constructor(container, func, filterManager) {
            const filterWrap = createElement('div', 'filter-buttons', null, container);
            this.callSend = func;
            this.init(filterWrap);
            this.addEvents(filterManager);
        }
        init(filterWrap) {
            this.doFilter = createElement('button', 'btn accent', 'Фильтровать', filterWrap);
            this.doFilter.setAttribute('type', 'submit');
            this.doReset = createElement('button', 'btn secondary', 'Сбросить', filterWrap);
        }
        addEvents(filterManager) {
            this.doFilter.onclick = () => {
                this.callSend('doFilter', filterManager);
                return false;
            };
            this.doReset.onclick = () => {
                this.callSend('doReset', filterManager);
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
        filterState = false;
        filter;
        table;
        pagination;
        constructor() {
            this.filter = new Components.Filter(document.querySelector('.with-nav'), this.redrawTable, this);
            new Components.Manager();
            this.table = new Components.Table(document.querySelector('.with-nav'), Components.Manager.open);
            this.pagination = new Components.Pagination(document.querySelector('main'));
            this.updateData();
            // TODO: вынести запросы в request
            // Base.Request.sendData(this.sendData, `${appDomain}/table`, 'POST', this.afterSend )
            this.send(this.sendData);
        }
        redrawTable(btn, filterManager) {
            console.log(btn);
            console.log(filterManager.filterState);
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
                    console.log('тут запрос с новыми данными');
                    break;
            }
        }
        updateData() {
            this.sendData = this.filter.getData();
        }
        // public afterSend(result: tableData): void {
        //     this.table.redraw(result);
        //     this.pagination.redraw(result.limit);
        // }
        send(data) {
            console.log('send');
            console.log(data);
            fetch(`${appDomain}/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            })
                .then(async (response) => {
                let result = await response.json();
                this.table.redraw(result);
                this.pagination.redraw(result.limit);
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
// function setEmailFromCookie(input: HTMLInputElement): void {
//     // TODO: заменить email
//     document.cookie = "user=oleksyuk@camozzi.ru";
//     input.value = getCookie('user');
// }
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
var Components;
(function (Components) {
    class Manager {
        static managerWindow;
        static windowOk;
        constructor() {
        }
        static open(id) {
            fetch(`${appDomain}/manager/${id}`)
                .then(async (response) => {
                let result = await response.json();
                const title = 'Связаться с менеджером';
                const action = './test.php';
                const form = Manager.getContent(result, action);
                Manager.managerWindow = Components.Window.create(title, form);
            });
        }
        static getContent(data, action) {
            const form = document.createElement('form');
            form.className = 'manager';
            form.action = action;
            createElement('div', 'manager-head', `${data.name} ${data.surname} (${data.position})`, form);
            const infoWrap = createElement('div', 'manager-info', null, form);
            const imgWrap = createElement('div', null, null, infoWrap);
            const img = createElement('img', null, null, imgWrap);
            img.src = data.image;
            const info = createElement('div', 'manager-info-text', null, infoWrap);
            const row1 = createElement('div', null, null, info);
            const row2 = createElement('div', null, null, info);
            const row3 = createElement('div', null, null, info);
            createElement('div', null, 'email:', row1);
            createElement('div', null, data.email, row1);
            createElement('div', null, 'Телефон:', row2);
            createElement('div', null, data.phone, row2);
            createElement('div', null, 'whats app:', row3);
            createElement('div', null, data.whats_app, row3);
            createElement('div', null, 'Сообщение на email:', form);
            const textareaWrap = createElement('div', null, null, form);
            const textarea = createElement('textarea', null, null, textareaWrap);
            setAttributes(textarea, { 'name': 'message' });
            Manager.createBtnSend(form);
            return form;
        }
        static createBtnSend(form) {
            const button = createElement('button', 'btn accent', 'Отправить', form);
            setAttributes(button, { 'type': 'submit' });
            button.onclick = () => {
                Base.Request.sendForm(form, 'POST', () => { Manager.sendOk(); });
                return false;
            };
        }
        static sendOk() {
            Manager.managerWindow.close();
            const messageOk = document.createElement('div');
            messageOk.textContent = 'Отправлено';
            messageOk.className = 'send-ok';
            Manager.windowOk = Components.Window.create(null, messageOk);
        }
    }
    Components.Manager = Manager;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class Pagination {
        wrap;
        constructor(container) {
            this.init(container);
        }
        init(container) {
            this.wrap = createElement('div', 'pagination-wrap container hide', null, container);
            createElement('div', 'pagination-number', '1', this.wrap);
        }
        redraw(limit) {
            console.log(limit);
            limit > 1 ? this.show() : this.hide();
        }
        show() {
            this.wrap.classList.remove('hide');
        }
        hide() {
            this.wrap.classList.add('hide');
        }
    }
    Components.Pagination = Pagination;
})(Components || (Components = {}));
var Components;
(function (Components) {
    /**
     * Менеджер работы с окнами
     */
    class Window {
        static windows = {};
        static iter = 0;
        static windowsHTML = null;
        static content = null;
        // public static showMessage(text: string): Instance {
        //     return Window.create(null, text);
        // }
        static create(title = null, content) {
            document.querySelector('body').style.overflow = 'hidden';
            if (!Window.windowsHTML) {
                Window.windowsHTML = document.createElement('div');
                this.windowsHTML.className = 'windows';
                document.querySelector('main').append(Window.windowsHTML);
            }
            this.content = content;
            this.content.classList.add('active');
            let id = ++Window.iter;
            let wind = new Instance(id, title, this.content);
            Window.windows[id] = wind;
            return wind;
        }
        static remove(id) {
            document.querySelector('body').style.overflow = 'revert';
            delete Window.windows[id];
        }
    }
    Components.Window = Window;
    /**
     * Работа с окнами
     */
    class Instance {
        id;
        instance;
        constructor(id, title, content) {
            this.id = id;
            this.instance = document.createElement('div');
            let space = document.createElement('div');
            let window = document.createElement('div');
            let header = document.createElement('div');
            let titleHTML = document.createElement('div');
            let closeHTML = document.createElement('div');
            let container = document.createElement('div');
            this.instance.className = 'instance';
            space.className = 'space';
            window.className = 'window';
            titleHTML.className = 'title';
            closeHTML.className = 'close';
            (title !== null) ? header.className = 'head' : header.className = 'head_null_title';
            (title !== null) ? container.className = 'container' : container.className = 'container_null_title';
            this.instance.append(space);
            this.instance.append(window);
            window.append(header);
            if (title !== null) {
                header.append(titleHTML);
                titleHTML.append(title);
            }
            header.append(closeHTML);
            window.append(container);
            container.append(content);
            space.addEventListener('click', this.close.bind(this));
            closeHTML.addEventListener('click', this.close.bind(this));
            Window.windowsHTML.append(this.instance);
        }
        close() {
            this.instance.remove();
            this.remove();
        }
        remove() {
            Window.remove(this.id);
        }
    }
    Components.Instance = Instance;
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
            Request.send(formData, url, method, func);
        }
        // public static sendData(data: { [key: string]: string|boolean|number }, url: string, method: string, func?: Function): void {
        //     console.log(data);
        //     let formData = new FormData();
        //     for (const key in data) {
        //         console.log({key});
        //         console.log(data[key]);
        //         formData.append(key, data[key].toString());
        //         console.log('this', formData.get(key));
        //     }
        //
        //     Request.send(formData, url, method, func);
        // }
        static sendData(data, url, method, func) {
            fetch(url, {
                method: method,
                body: JSON.stringify(data)
            })
                .then(async (response) => {
                let json = await response.json();
                func(json);
            });
            // .catch(response => { console.log('request failed: ' + url); console.log(response); });
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
            // anchor.href = this.getFile(filename);
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
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `${appDomain}/document`);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                if (this.status === 200) {
                    const blob = new Blob([xhr.response], { type: "application/pdf" });
                    const objectUrl = URL.createObjectURL(blob);
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
        subTable;
        tableWrap;
        wrap;
        tbody;
        tr;
        callbackManager;
        constructor(container, callbackManager) {
            this.wrap = createElement('div', 'table-wrap', null, container);
            const tableInfo = createElement('div', 'table-info', null, this.wrap);
            createElement('div', null, 'Настроить колонки таблицы', tableInfo);
            createElement('div', null, 'Выбрано столбцов: 0', tableInfo);
            this.tableWrap = createElement('div', 'table', null, this.wrap);
            this.subTable = new Components.SubTable();
            this.callbackManager = callbackManager;
            this.init();
        }
        init() {
            const table = createElement('table', null, null, this.tableWrap);
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
        redraw(data) {
            // очистить таблицу
            this.tbody.innerHTML = '';
            // наполнить таблицу,создав новые элементы
            for (const key in data.orders) {
                const tr = createElement('tr', 'table-row', null, this.tbody);
                setAttributes(tr, { 'data-order-id': key });
                setAttributes(createElement('td', 'table-cell', `${data.orders[key].invoiceId}`, tr), { 'data-column': 'invoiceId' });
                setAttributes(createElement('td', 'table-cell', `${data.orders[key].positions}`, tr), { 'data-column': 'position' });
                setAttributes(createElement('td', 'table-cell', data.orders[key].orderAmount, tr), { 'data-column': 'priceAll' });
                const anchorWrap = createElement('td', 'table-cell table-cell-manager', `${data.orders[key].manager.name} ${data.orders[key].manager.surname}`, tr);
                setAttributes(anchorWrap, { 'data-column': 'manager' });
                anchorWrap.addEventListener('click', (event) => { event.stopPropagation(); this.callbackManager(data.orders[key].manager.id); });
                setAttributes(createElement('td', 'table-cell', 'дописать', tr), { 'data-column': 'triggerLetter' });
                const linkWrap = createElement('td', 'table-cell', null, tr);
                setAttributes(linkWrap, { 'data-column': 'linkPayment' });
                const link = createElement('a', 'table-cell-link', null, linkWrap);
                data.orders[key].paymentLink ? link.href = data.orders[key].paymentLink : console.log('что-то с ссылкой сделать');
                setAttributes(link, { 'target': '_blank' });
                link.addEventListener('click', (event) => { event.stopPropagation(); });
                setAttributes(createElement('td', 'table-cell', data.orders[key].paymentStatus, tr), { 'data-column': 'statusPayment' });
                setAttributes(createElement('td', 'table-cell', data.orders[key].shipmentStatus, tr), { 'data-column': 'statusShipment' });
                setAttributes(createElement('td', 'table-cell', data.orders[key].deliveryStatus, tr), { 'data-column': 'statusDelivery' });
                const orderDate = data.orders[key].orderDate ? data.orders[key].orderDate.date.split(' ', 2)[0] : '';
                const paymentDate = data.orders[key].paymentDate ? data.orders[key].paymentDate.date.split(' ', 2)[0] : '';
                const shipmentDate = data.orders[key].shipmentDate ? data.orders[key].shipmentDate.date.split(' ', 2)[0] : '';
                const deliveryDate = data.orders[key].deliveryDate ? data.orders[key].deliveryDate.date.split(' ', 2)[0] : '';
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
            const orderId = tr.getAttribute('data-order-id');
            fetch(`${appDomain}/order/${orderId}`)
                .then(async (response) => {
                tr.classList.remove('load');
                let result = await response.json();
                this.subTable.redraw(tr, result[orderId], orderId);
            });
        }
    }
    Components.Table = Table;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class Filter {
        select;
        filterBtn;
        constructor(container, func, filterManager) {
            const filterWrap = createElement('form', 'filter', null, container);
            this.createElements(filterWrap);
            //
            this.select = new Components.Select(document.querySelector('[name="deliveryStatus"]'));
            this.filterBtn = new Components.FilterButtons(filterWrap, func, filterManager);
        }
        createElements(container) {
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
                    setAttributes(input1, { 'value': dataForInputs[key].value });
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
        getData() {
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
                    "orderDate": ["", ""],
                    "orderAmount": ["", ""],
                    "shipmentNumber": "",
                    "factureNumber": "",
                    "deliveryStatus": "",
                    "deliveryDate": ["", ""]
                },
                "sort": {
                    "field": "",
                    "order": ""
                }
            };
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
            console.log({ data });
            // console.log({data});
            return data;
        }
        resetInputs() {
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
    Components.Filter = Filter;
})(Components || (Components = {}));
//# sourceMappingURL=main.js.map