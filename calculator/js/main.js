"use strict";
var Components;
(function (Components) {
    class Checkboxes {
        data;
        head;
        constructor(wrap, textContent, key, data) {
            this.head = createElement('div', null, textContent, wrap);
            const checkboxesWrap = createElement('div', 'option-group-select', null, wrap);
            this.createCheckboxes(checkboxesWrap, data);
        }
        getValue() {
            return this.data;
        }
        updateData() {
            console.log('update data: ', this.data);
        }
        createCheckboxes(checkboxesWrap, data) {
            console.log('create checkboxes: ', data);
        }
        async redrawType(dataResp) {
            console.log('redraw type');
            // dataResp.then(
            //     result => {
            //         // console.log(result);
            //         this.head.style.backgroundColor = 'transparent';
            //         for (const key in this.list) {
            //             this.list[key].style.backgroundColor = 'transparent';
            //
            //             for (let i = 0; i < result.length; i++) {
            //                 if (result[i] === key) {
            //                     this.list[key].style.backgroundColor = 'darkseagreen';
            //
            //                     // Много раз это делается в цикле, переписать
            //                     this.head.style.backgroundColor = 'darkseagreen';
            //                 }
            //             }
            //         }
            //     }
            // )
        }
        on(event, handler) {
            this.updateData();
            // .addEventListener(event, () => {
            //     // TODO: обновить данные
            //     this.updateData();
            //     handler();
            // });
        }
    }
    Components.Checkboxes = Checkboxes;
})(Components || (Components = {}));
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
var Components;
(function (Components) {
    const appDomain = 'http://192.168.0.178:5049/products';
    class Options {
        data;
        elems = {
            options: {},
            connections: {
                types: {},
                sizes: {}
            },
            physicalCharacteristics: {}
        };
        physicalCharacteristics;
        table;
        pagination;
        constructor(wrap) {
            /* TODO: разобраться с wrap */
            this.physicalCharacteristics = new Components.Characteristics(document.querySelector('.character-group'));
            const tableWrap = document.querySelector('.table-wrap');
            this.table = new Components.Table(tableWrap);
            this.pagination = new Components.Pagination(tableWrap, () => { this.onChange().then(); });
            this.fetchesOptions(document.querySelector('.option-options')).then();
            this.fetchesConnections(document.querySelector('.option-connections')).then();
        }
        async fetchesOptions(wrap) {
            let requests = optionsArray.map(name => fetch(`${appDomain}/options/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            }));
            Promise.all(requests).then(async (responses) => {
                let result = responses.map(async (r) => await r.json());
                let i = 0;
                for (const key in options) {
                    if (key === 'type') {
                        this.elems['options'][key] = new Components.Select(document.querySelector('.option-type'), options[key], key, result[i++], true);
                    }
                    else {
                        this.elems['options'][key] = new Components.Select(wrap, options[key], key, result[i++]);
                    }
                    this.elems['options'][key].on('change', async () => {
                        this.pagination.setPage(1);
                        await this.onChange();
                    });
                }
            });
        }
        async fetchesConnections(wrap) {
            fetch(`${appDomain}/connections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            })
                .then(async (response) => {
                let result = await response.json();
                for (const key in connections) {
                    const typeName = connections[key]['connectionTypes'].name;
                    const typeHead = connections[key]['connectionTypes'].head;
                    const sizeName = connections[key]['connectionSizes'].name;
                    const sizeHead = connections[key]['connectionSizes'].head;
                    this.elems['connections']['types'][key] = new Components.Select(wrap, typeHead, typeName, result[key]['connectionTypes']);
                    this.elems['connections']['sizes'][key] = new Components.Select(wrap, sizeHead, sizeName, result[key]['connectionSizes']);
                    this.elems['connections']['types'][key].on('change', async () => {
                        this.pagination.setPage(1);
                        await this.onChange();
                    });
                    this.elems['connections']['sizes'][key].on('change', async () => {
                        this.pagination.setPage(1);
                        await this.onChange();
                    });
                }
            })
                .catch(response => { console.log(`request failed: ${appDomain}/connections`); console.log(response); });
        }
        async onChange() {
            this.collectData();
            await this.sendConnections();
            await this.sendOptions();
            await this.sendSold();
        }
        collectData(exception = '') {
            let data = {};
            for (const key in this.elems['options']) {
                // if (key === exception) {
                //     delete data[key];
                //     continue;
                // }
                if (key === 'type') {
                    const value = this.elems['options'][key].getValueMultiple();
                    if (value.length > 0)
                        data[key] = value;
                    continue;
                }
                const value = this.elems['options'][key].getValue();
                if (value)
                    data[key] = value;
            }
            /* TODO: переписать этот кошмар */
            data['connections'] = [];
            for (let i = 0; i < 4 /* TODO: магическое число заменить */; i++) {
                // if (key === exception) {
                //     delete data[key];
                //     continue;
                // }
                const type = this.elems['connections']['types'][i].getValue();
                const size = this.elems['connections']['sizes'][i].getValue();
                if (type !== '' || size !== '') {
                    let connectionsItem = {};
                    if (size !== '')
                        connectionsItem['connectionSize'] = size;
                    if (type !== '')
                        connectionsItem['connectionType'] = type;
                    connectionsItem['connectionNo'] = Number(i) + 1;
                    data['connections'].push(connectionsItem);
                }
            }
            if (this.physicalCharacteristics.getValues())
                data['physicalCharacteristics'] = this.physicalCharacteristics.getValues();
            console.log({ data });
            this.data = data;
        }
        redrawSelectsOptions(dataResp) {
            let i = 0;
            for (const key in options) {
                // if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;
                this.elems['options'][key].redrawOptions(dataResp[i++]);
            }
        }
        redrawSelectsConnections(dataResp) {
            let j = 0;
            for (const key in connections) {
                this.elems['connections']['types'][key].redrawConnections(dataResp[j++]['connectionTypes']);
                j = 0;
                this.elems['connections']['sizes'][key].redrawConnections(dataResp[j++]['connectionSizes']);
            }
        }
        redrawProductsTable(dataResp) {
            this.table.redraw(dataResp['soldProducts']);
            this.pagination.redraw(dataResp['availablePages']);
        }
        async sendOptions() {
            let requests = optionsArray.map(name => fetch(`${appDomain}/options/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.data)
            }));
            Promise.all(requests).then(async (responses) => {
                let result = responses.map(async (r) => await r.json());
                this.redrawSelectsOptions(result);
            });
        }
        async sendConnections() {
            fetch(`${appDomain}/connections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.data)
            })
                .then(async (response) => {
                let result = await response.json();
                this.redrawSelectsConnections(result);
            });
        }
        async sendSold() {
            const page = this.pagination.getPage().toString();
            fetch(`${appDomain}/sold?PageId=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.data)
            })
                .then(async (response) => {
                let result = await response.json();
                this.redrawProductsTable(result);
            });
        }
    }
    Components.Options = Options;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class Pagination {
        limitPage;
        page;
        pagination;
        first;
        previous;
        current;
        next;
        last;
        callback;
        constructor(wrap, callback) {
            this.callback = callback;
            this.page = 1;
            this.init(wrap);
        }
        init(wrap) {
            this.pagination = createElement('div', 'pagination', null, wrap);
            this.first = createElement('div', '', 'первая страница', this.pagination);
            this.previous = createElement('div', '', '<-', this.pagination);
            this.current = createElement('div', '', this.page.toString(), this.pagination);
            this.next = createElement('div', '', '->', this.pagination);
            this.last = createElement('div', '', 'последняя страница', this.pagination);
            this.setEvents();
        }
        setEvents() {
            this.first.addEventListener('click', () => { this.page = 1; this.callback(); });
            this.previous.addEventListener('click', () => { this.page--; this.callback(); });
            this.next.addEventListener('click', () => { this.page++; this.callback(); });
            this.last.addEventListener('click', () => { this.page = this.limitPage; this.callback(); });
        }
        redraw(limitPage) {
            this.limitPage = limitPage;
            this.show();
            if (this.limitPage === 0) {
                this.hide();
                return;
            }
            this.current.textContent = this.page.toString();
            this.first.classList.remove('not-active');
            this.previous.classList.remove('not-active');
            this.next.classList.remove('not-active');
            this.last.classList.remove('not-active');
            if (this.page === 1) {
                this.first.classList.add('not-active');
                this.previous.classList.add('not-active');
            }
            if (this.page === this.limitPage) {
                this.next.classList.add('not-active');
                this.last.classList.add('not-active');
            }
        }
        show() {
            this.pagination.classList.remove('hide');
        }
        hide() {
            this.pagination.classList.add('hide');
        }
        setPage(number) {
            this.page = number;
        }
        getPage() {
            return this.page;
        }
    }
    Components.Pagination = Pagination;
})(Components || (Components = {}));
var Components;
(function (Components) {
    class Select {
        head;
        select;
        list = {};
        dataMultiple = [];
        constructor(wrap, textContent, key, data, type = false) {
            const selectWrap = createElement('div', 'option-group-select', null, wrap);
            this.head = createElement('div', null, textContent, selectWrap);
            this.select = createElement('select', null, null, selectWrap);
            if (type)
                this.select.setAttribute('multiple', 'multiple');
            this.select.setAttribute('name', key);
            this.createOptions(data).then();
        }
        async createOptions(data) {
            createElement('option', null, '', this.select);
            for (const value of await data) {
                this.list[value] = createElement('option', null, value, this.select);
            }
        }
        getValue() {
            return this.select.value;
        }
        getValueMultiple() {
            return this.dataMultiple;
        }
        updateDataMultiple(select) {
            // TODO: разобраться с этим
            // const selectedValues = Array.from(select.selectedOptions).map(option => option.value);
            //
            // const opts = select.options;
            // const selected = Array.from(opts).filter(o => o.selected).map(o => o.value);
            this.dataMultiple = [];
            const options = select.options;
            for (let opt of options) {
                if (opt.selected && opt.value !== '')
                    this.dataMultiple.push(opt.value);
            }
        }
        async redrawOptions(dataResp) {
            dataResp.then(result => {
                // console.log(result);
                this.head.style.backgroundColor = 'transparent';
                for (const key in this.list) {
                    this.list[key].style.backgroundColor = 'transparent';
                    for (let i = 0; i < result.length; i++) {
                        if (result[i] === key) {
                            this.list[key].style.backgroundColor = 'darkseagreen';
                            // Много раз это делается в цикле, переписать
                            this.head.style.backgroundColor = 'darkseagreen';
                        }
                    }
                }
            });
        }
        async redrawConnections(dataResp) {
            // console.log(dataResp);
            this.head.style.backgroundColor = 'transparent';
            for (const key in this.list) {
                this.list[key].style.backgroundColor = 'transparent';
                for (let i = 0; i < dataResp.length; i++) {
                    if (dataResp[i] === key) {
                        this.list[key].style.backgroundColor = 'darkseagreen';
                        // Много раз это делается в цикле, переписать
                        this.head.style.backgroundColor = 'darkseagreen';
                    }
                }
            }
        }
        on(event, handler) {
            this.select.addEventListener(event, (ev) => {
                let select = ev.target;
                if (select.hasAttribute('multiple'))
                    this.updateDataMultiple(select);
                handler();
            });
        }
    }
    Components.Select = Select;
})(Components || (Components = {}));
const dataAttrForTable = 'data-db';
var Components;
(function (Components) {
    class Table {
        wrap;
        table;
        tbody;
        constructor(wrap) {
            this.init(wrap);
        }
        init(wrap) {
            this.wrap = wrap;
            this.table = createElement('table', 'table', null, wrap);
            const thead = createElement('thead', null, null, this.table);
            const tr = createElement('tr', null, null, thead);
            /* TODO: нужен ли атрибут для создания элементов в нужном месте */
            createElement('th', null, 'Артикул', tr).setAttribute(dataAttrForTable, 'vendorCode');
            createElement('th', null, 'Рейтинг типа', tr).setAttribute(dataAttrForTable, 'typeRating');
            createElement('th', null, 'Рейтинг самого товара', tr).setAttribute(dataAttrForTable, 'rating');
            createElement('th', null, 'Количество заказов', tr).setAttribute(dataAttrForTable, 'numberOfOrders');
            createElement('th', null, 'Количество купленных', tr).setAttribute(dataAttrForTable, 'purchasedQuantity');
            createElement('th', null, 'Цена', tr).setAttribute(dataAttrForTable, 'price');
            this.tbody = createElement('tbody', null, null, this.table);
        }
        hide() {
            if (!this.wrap.classList.contains('hide'))
                this.wrap.classList.add('hide');
        }
        show() {
            if (this.wrap.classList.contains('hide'))
                this.wrap.classList.remove('hide');
        }
        redraw(soldProducts) {
            this.tbody.innerHTML = '';
            if (!soldProducts.length) {
                this.hide();
                return;
            }
            this.show();
            for (const item of soldProducts) {
                const tr = createElement('tr', null, null, this.tbody);
                // console.log(dataRespElement);
                createElement('td', null, item['vendorCode'], tr);
                createElement('td', null, item['typeRating'], tr);
                createElement('td', null, item['rating'], tr);
                createElement('td', null, item['numberOfOrders'], tr);
                createElement('td', null, item['purchasedQuantity'], tr);
                createElement('td', null, item['price'], tr);
                /* TODO: может быть сделать циклом формирование tr исходя из данных */
                // for (const key in dataRespElement) {
                //     createElement('td', null, dataRespElement[key], tr);
                // }
            }
        }
    }
    Components.Table = Table;
})(Components || (Components = {}));
// namespace Components {
//
//     const appDomain = 'http://192.168.0.178:5049/products';
//
//     export class Options {
//         private data                        : optionsData;
//         private elems                       : object = {
//             options: {},
//             connections: {
//                 types: {},
//                 sizes: {}
//             }
//         };
//
//         private table                       : Table;
//         private pagination                  : Pagination;
//
//         constructor(wrap: HTMLElement) {
//             /* TODO: разобраться с wrap */
//             const tableWrap: HTMLElement    = document.querySelector('.table-wrap');
//
//             this.table                      = new Table(tableWrap);
//             this.pagination                 = new Pagination(tableWrap, () => { this.onChange().then(); });
//
//             this.fetchesOptions(document.querySelector('.option-options')).then();
//             this.fetchesConnections(document.querySelector('.option-connections')).then();
//         }
//
//         private async fetchesOptions(wrap: HTMLElement): Promise<void> {
//             let requests = optionsArray.map(name => fetch(`${appDomain}/options/${name}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify({})
//             }));
//
//             Promise.all(requests).then(async responses => {
//                 let result = responses.map(async r => await r.json())
//
//                 let i = 0;
//                 for (const key in options) {
//                     if (key === 'type') {
//                         this.elems['options'][key] = new Checkboxes(document.querySelector('.option-type'), options[key], key, result[i++]);
//                         this.elems['options'][key].on('change', async () => {
//                             this.pagination.setPage(1);
//                             await this.onChange();
//                         })
//                         continue;
//                     }
//
//                     this.elems['options'][key] = new Select(wrap, options[key], key, result[i++]);
//                     this.elems['options'][key].on('change', async () => {
//                         this.pagination.setPage(1);
//                         await this.onChange();
//                     });
//                 }
//             });
//         }
//
//         private async fetchesConnections(wrap: HTMLElement): Promise<void> {
//             fetch(`${appDomain}/connections`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify({})
//             })
//                 .then(async response => {
//                     let result = await response.json();
//
//                     for (const key in connections) {
//                         const typeName = connections[key]['connectionTypes'].name;
//                         const typeHead = connections[key]['connectionTypes'].head;
//                         const sizeName = connections[key]['connectionSizes'].name;
//                         const sizeHead = connections[key]['connectionSizes'].head;
//
//                         this.elems['connections']['types'][key] = new Select(wrap, typeHead, typeName, result[key]['connectionTypes']);
//                         this.elems['connections']['sizes'][key] = new Select(wrap, sizeHead, sizeName, result[key]['connectionSizes']);
//
//                         this.elems['connections']['types'][key].on('change', async () => {
//                             this.pagination.setPage(1);
//                             await this.onChange()
//                         });
//                         this.elems['connections']['sizes'][key].on('change', async () => {
//                             this.pagination.setPage(1);
//                             await this.onChange()
//                         });
//                     }
//                 })
//                 .catch(response => { console.log(`request failed: ${appDomain}/connections`); console.log(response); });
//         }
//
//         private async onChange(): Promise<void> {
//             this.collectData();
//             await this.sendConnections();
//             await this.sendOptions();
//             await this.sendSold();
//         }
//
//         private collectData(exception: string = ''): void {
//             let data: optionsData = {};
//             for (const key in this.elems['options']) {
//                 // if (key === exception) {
//                 //     // delete data[key];
//                 //     continue;
//                 // }
//                 const value = this.elems['options'][key].getValue();
//                 if (value) data[key] = value;
//                 // if (key === 'type') {
//                 //     if (value) data[key] = value;
//                 //     continue;
//                 // }
//                 // if (value !== '') data[key] = value;
//             }
//
//             /* TODO: переписать этот кошмар */
//             data['connections'] = []
//             for (let i = 0; i < 4 /* TODO: магическое число заменить */; i++) {
//                 // if (key === exception) {
//                 //     // delete data[key];
//                 //     continue;
//                 // }
//                 const type = this.elems['connections']['types'][i].getValue();
//                 const size = this.elems['connections']['sizes'][i].getValue();
//
//                 if (type !== '' || size !== '') {
//                     let connectionsItem = {}
//                     if (size !== '') connectionsItem['connectionSize'] = size;
//                     if (type !== '') connectionsItem['connectionType'] = type;
//                     connectionsItem['connectionNo'] = Number(i) + 1;
//                     data['connections'].push(<connections>connectionsItem);
//                 }
//             }
//
//             this.data = data;
//         }
//
//         private redrawSelectsOptions(dataResp): void {
//             let i = 0;
//             for (const key in options) {
//                 // if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;
//                 if (key === 'type') {
//                     this.elems['options'][key].redrawType(dataResp[i++]);
//                     continue;
//                 }
//                 this.elems['options'][key].redrawOptions(dataResp[i++]);
//             }
//         }
//
//         private redrawSelectsConnections(dataResp): void {
//             let j = 0;
//             for (const key in connections) {
//                 this.elems['connections']['types'][key].redrawConnections(dataResp[j++]['connectionTypes']);
//
//                 j = 0;
//                 this.elems['connections']['sizes'][key].redrawConnections(dataResp[j++]['connectionSizes']);
//             }
//         }
//
//         private redrawProductsTable(dataResp): void {
//             this.table.redraw(dataResp['soldProducts']);
//             this.pagination.redraw(dataResp['availablePages']);
//         }
//
//         private async sendOptions() {
//             let requests = optionsArray.map(name => fetch(`${appDomain}/options/${name}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify(this.data)
//             }));
//
//             Promise.all(requests).then(async responses => {
//                 let result = responses.map(async r => await r.json());
//                 this.redrawSelectsOptions(result);
//             })
//         }
//
//         private async sendConnections(): Promise<void> {
//             fetch(`${appDomain}/connections`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify(this.data)
//             })
//                 .then(async response => {
//                     let result = await response.json();
//                     this.redrawSelectsConnections(result);
//                 })
//         }
//         private async sendSold(): Promise<void> {
//             const page = this.pagination.getPage().toString();
//             fetch(`${appDomain}/sold?PageId=${page}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify(this.data)
//             })
//                 .then(async response => {
//                     let result = await response.json();
//                     this.redrawProductsTable(result);
//                 })
//         }
//     }
// }
const options = {
    type: "Тип изделия",
    assembly: "Корпус или сборка",
    series: "серия",
    additionalCoverage: "дополнительное покрытие",
    cleaningUnderOxygen: "очистка под кислород",
    mainMaterial: "основной материал",
    needleType: "тип иглы",
    handleType: "тип рукоятки",
    surfaceType: "тип поверхности",
    sealMaterial: "материал уплотнения",
    geometricConfiguration: "геометрическая конфигурация изделия",
    loadOption: "опция постоянной нагрузки у NV вентелей",
    panelMounting: "крепление на панель",
    pressureOption345b: "опция давления у NV",
    darinageOption: "опция дренажа",
    connectionPlug: "заглушка подсоединения",
    handleColor: "цвет рукоятки",
    driveType: "тип привода",
    conditionalPassageDiameter: "нестандартное ДУ",
    filterType: "тип фильтра",
    springType: "тип пружины",
    perssureValveSetting: "давление настройки клапана",
    highPressureOption: "опция высокого давления",
    len: "опция длины фитинга",
    zcrConnectionOption: "опция плечиков у подсоеднения у ZCR",
    meltingPoint: "Температура плавления защитного материала заглушки",
    plasticBodyColor: "цвет у брс",
};
const connections = [
    {
        connectionTypes: {
            name: 'conn1',
            head: 'тип подсоединения 1',
        },
        connectionSizes: {
            name: 'size1',
            head: 'размер подсоединения 1',
        }
    },
    {
        connectionTypes: {
            name: 'conn2',
            head: 'тип подсоединения 2',
        },
        connectionSizes: {
            name: 'size2',
            head: 'размер подсоединения 2',
        }
    },
    {
        connectionTypes: {
            name: 'conn3',
            head: 'тип подсоединения 3',
        },
        connectionSizes: {
            name: 'size3',
            head: 'размер подсоединения 3',
        }
    },
    {
        connectionTypes: {
            name: 'conn4',
            head: 'тип подсоединения 4',
        },
        connectionSizes: {
            name: 'size4',
            head: 'размер подсоединения 4',
        }
    },
];
const optionsArray = [
    'type',
    'assembly',
    'series',
    'additionalCoverage',
    'cleaningUnderOxygen',
    'mainMaterial',
    'needleType',
    'handleType',
    'surfaceType',
    'sealMaterial',
    'geometricConfiguration',
    'loadOption',
    'panelMounting',
    'pressureOption345b',
    'darinageOption',
    'connectionPlug',
    'handleColor',
    'driveType',
    'conditionalPassageDiameter',
    'filterType',
    'springType',
    'perssureValveSetting',
    'highPressureOption',
    'len',
    'zcrConnectionOption',
    'meltingPoint',
    'plasticBodyColor',
];
var Components;
(function (Components) {
    const characteristics = [
        {
            head: 'Temp min',
            name: 'minTemperature'
        },
        {
            head: 'Давление min',
            name: 'pressMin'
        },
        {
            head: 'Cv',
            name: 'cv'
        },
        {
            head: 'ДавлКорп',
            name: 'bodyPressure'
        },
        {
            head: 'Temp max',
            name: 'maxTemperature'
        },
        {
            head: 'Давление max',
            name: 'pressMax'
        },
        {
            head: 'Dn',
            name: 'dn'
        },
    ];
    class Characteristics {
        elems = {};
        constructor(wrap) {
            this.init(wrap);
        }
        init(wrap) {
            for (const element of characteristics) {
                const inputWrap = createElement('div', 'character-group-select', null, wrap);
                const head = createElement('div', null, element.head, inputWrap);
                this.elems[element.name] = createElement('input', null, null, inputWrap);
            }
        }
        getValues() {
            let out = {};
            for (const element of characteristics) {
                if (this.elems[element.name].value)
                    out[element.name] = this.elems[element.name].value;
            }
            return out;
        }
    }
    Components.Characteristics = Characteristics;
})(Components || (Components = {}));
//# sourceMappingURL=main.js.map