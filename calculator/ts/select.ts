namespace Components {
    export class Select {
        public select               : HTMLElement;
        constructor(wrap: HTMLElement, textContent: string, key: string, data: object) {
            const selectWrap = createElement('div', 'option-group-select', null, wrap);
            createElement('div', null, textContent, selectWrap);

            this.select = createElement('select', null, null, selectWrap);
            this.select.setAttribute('name', key);

            this.createOptions(['', 1, 2, 3]);
            // массив или структура для оптионс?
        }

        private createOptions(data): void {
            for (const key in data) {
                createElement('option', null, data[key], this.select);
            }
        }

        public getValue(): string {
            return '';
        }

        public redraw(): void {

        }
    }
}