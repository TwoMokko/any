// namespace Components {
//     export class Select {
//         public sourceSelect                     : HTMLSelectElement;
//         public sourceOptions                    : HTMLOptionsCollection;
//
//         private readonly header                 : HTMLElement;
//         private list                            : HTMLElement;
//
//         private isOpen                          : boolean;  // флаг, состояние: открыт или закрыт селект
//         private isSelect                        : boolean;  // флаг, состояние: выбрано что-то или нет
//         private readonly duration               : number;   // анимация
//
//         public constructor(sourceSelect: HTMLSelectElement) {
//             this.isSelect = false;
//             this.isOpen = false;
//             this.duration = 450;
//
//             this.sourceSelect = sourceSelect;
//             this.sourceOptions = sourceSelect.querySelectorAll('option');
//
//             // sourceSelect.hide();
//
//             /* Create Elements */
//             const wrap = createElement('div', 'select-wrap', null, sourceSelect.closest('div'));
//             this.header = createElement('div', 'new-select', this.sourceOptions.filter(':selected').text(), wrap);
//             this.list = createElement('div', 'new-select-list', null, wrap);
//
//             /* Building DOM */
//             // wrap.append(
//             //     this.header,
//             //     this.list.append(
//             //         this.getOptions()
//             //     )
//             // );
//
//             /* Events */
//             this.header.addEventListener('click', () => {
//                 if (this.header.classList.contains('disabled')) {
//                     return;
//                 }
//                 this.switchSelect();
//             });
//
//             sourceSelect.after(wrap);
//
//             this.list.slideUp(0);
//         }
//
//         public static factory($sourceSelect: JQuery): Select[] {
//             let $out: Select[] = [];
//             for (let i: number = 0; i < $sourceSelect.length; i++) {
//                 let select: Select = new Select($sourceSelect.eq(Number(i)));
//                 $out.push(select);
//             }
//             return $out;
//         }
//
//         private getOptions(): JQuery[] {
//             let $options: JQuery[]= [];
//             let sourceOptions = this.sourceSelect.children('option');
//             for (let i: number = 0; i < sourceOptions.length; i++) {
//                 $options.push(this.getOption($(sourceOptions[i])));
//             }
//             return $options;
//         }
//
//         private getOption($sourceOption: JQuery): JQuery {
//             let text: string = $sourceOption.text();
//             let value: string = $sourceOption.val() as string;
//
//             let $option: JQuery<HTMLElement> = $('<div>', {
//                 class: 'new-select-list-item',
//                 html: $('<span>', {
//                     text: text
//                 }),
//                 'data-value': value
//             });
//
//             $option.on('click', (): void => {
//                 this.sourceOptions.filter(':selected').removeAttr('selected');
//                 $sourceOption.attr('selected', 'selected');
//                 this.isSelect = true;
//                 $sourceOption.trigger('change');
//                 this.header.textContent = text;
//
//                 this.close();
//             });
//
//             return $option;
//         }
//
//         private switchSelect(): void {
//             this.isOpen ? this.close() : this.open();
//         }
//
//         private open(): void {
//             this.isOpen = true;
//             this.header.classList.add('on');
//             this.list.slideDown(this.duration);
//         }
//
//         private close(): void {
//             this.isOpen = false;
//             this.header.classList.remove('on');
//             this.list.slideUp(this.duration);
//         }
//
//         public getIsSelect(): boolean {
//             return this.isSelect;
//         }
//
//         public getValue(): string {
//             return (this.sourceOptions.filter(':selected').val() as string);
//         }
//
//         public getText(): string {
//             return (this.sourceOptions.filter(':selected').text() as string);
//         }
//
//         public setValue(value: string, event: boolean = true): void {
//             if (!event) {
//                 this.sourceOptions.filter(':selected').removeAttr('selected');
//                 let $option = this.sourceOptions.filter(`[value=${value}]`);
//                 $option.attr('selected', 'selected');
//                 this.header.textContent = $option.text();
//                 return;
//             }
//             this.list.children(`[data-value=${value}]`).trigger('click');
//         }
//
//         public restructure(data: {[key: string]: string}): void {
//             this.list.slideUp(0);
//
//             this.sourceSelect.empty();
//
//             for (const i in data) {
//                 this.sourceSelect.append(
//                     $('<option/>').text(data[i]).val(i)
//                 );
//             }
//
//             this.sourceOptions = this.sourceSelect.children('option');
//
//             this.header.textContent = this.sourceOptions.filter(':selected').textContent;
//
//             this.list.append(
//                 this.getOptions()
//             );
//         }
//
//         public addDisabled(): void {
//             this.header.classList.add('disabled');
//         }
//         public removeDisabled(): void {
//             this.header.classList.remove('disabled');
//         }
//
//         /* Навешивание события: при изменении селекта срабатывает переданная процедура */
//         public on(event: string, func: Function, data: {[key: string]: any} = {}): void {
//             switch (event) {
//                 case 'change': this.sourceSelect.addEventListener('change', () => { func(this.sourceSelect, data); }); break;
//                 default: console.warn('Event not found'); break;
//             }
//         }
//     }
// }