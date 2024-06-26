namespace Components {
    export class Table {
        private data                : tableData;

        private container           : HTMLElement;
        private tbody               : HTMLElement;
        private tr                  : HTMLTableRowElement;
        constructor(container: HTMLElement, data: tableData) {
            this.data               = data;
            this.container          = container;

            this.init();
            this.redraw();
        }

        private init(): void {
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

        public redraw(): void {
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

                tr.onclick = (event): void => {
                    console.log(event.target.closest('tr'));
                    const trTarget = event.target.closest('tr');
                    trTarget.classList.add('load');
                    setTimeout(() => { this.sendDataOnclickRow('', {}, trTarget) }, 1000);
                    // this.redrawRow(event.target.closest('tr'), data);
                };
            }

            // навешать онклик на строки (труе фолс?)
        }

        public redrawRow(trTarget: HTMLTableRowElement, data): void {
            if (this.tr) this.tr.remove();

            this.tr = document.createElement('tr');
            this.tr.className = 'table-row-secondary';
            trTarget.after(this.tr);
            const td = createElement('td', null, null, this.tr);
            td.setAttribute('colspan', '14');

            const expanded = createElement('div', 'expanded', null, td);

            const tBody: HTMLElement = this.createSubRowTable(expanded);
            this.fillSubRowTable(data, tBody);
            this.createSubRowTotal(tBody);


            const invoiceDocs = createElement('div', 'invoice-docs', null, expanded);

            const btnWrap = createElement('div', null, null, invoiceDocs);
            createElement('div', null, 'Документы по заказу', btnWrap);
            const btnImgWrap = createElement('div', null, null, btnWrap);
            createElement('img', null, null, btnImgWrap).src = 'resources/img/download.svg';

            const offerList: HTMLElement = this.createSubRowDocs(invoiceDocs, 'Коммерческое предложение');
            const shipmentList: HTMLElement = this.createSubRowDocs(invoiceDocs, 'Отгрузка');
            this.fillSubRowDocs(offerList, data.files.commercial);
            this.fillSubRowDocs(shipmentList, data.files.shipment);

        }

        private sortOnDate(): void {
            console.log('sort on date');
        }

        private createSubRowTable(expanded: HTMLElement): HTMLElement {
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

            tHeadTextContent.forEach((item: string, i: number, thTopTextContent: string[]) => {
                createElement('th', null, item, tHeadRow);
            });

            return createElement('tbody', null, null, tableSecondary);
        }

        private fillSubRowTable(data, tBody: HTMLElement): void {
            let num = 1;
            for (const item in data.items) {
                const tr = createElement('tr', null, null, tBody);
                createElement('td', null, String(num), tr);
                num++;
                for ( let key in data.items[item]) {

                    const td = createElement('td', null, data.items[item][key], tr);
                }
                const lastTd = createElement('td', null, null, tr);
                const anchor: HTMLAnchorElement = createElement('a', null, null, lastTd);
                anchor.href = '';
                const img: HTMLImageElement = createElement('img', null, null, anchor);
                img.src = 'resources/img/download.svg';
            }
        }

        private createSubRowTotal(tBody: HTMLElement): void{
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

        private createSubRowDocs(invoiceDocs: HTMLElement, header: string): HTMLElement {
            const offerWrap = createElement('div', 'expanded-documents', null, invoiceDocs);
            createElement('div', null, header, offerWrap);
            return createElement('div', null, null, offerWrap);
        }

        private fillSubRowDocs(list: HTMLElement, data): void {
            for (const key in data) {
                const anchor = createElement('a', null, null, list);
                anchor.href = 'link';
                let num = Number(key) + 1;
                createElement('div', null, `${num}.`, anchor);
                createElement('div', null, data[key], anchor);
                createElement('img', null, null, createElement('div', null, null, anchor)).src = 'resources/img/download.svg';
            }
        }

        private sendDataOnclickRow(pathData: string, sendData, tr: HTMLTableRowElement): void {
            const dataRow =  {
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
            }
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
}