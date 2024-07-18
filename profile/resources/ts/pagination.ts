namespace Components {
    export class Pagination {
        private wrap        : HTMLElement;
        constructor(container: HTMLElement) {
            this.init(container);
        }
        private init(container: HTMLElement): void {
            this.wrap = createElement('div', 'pagination-wrap container hide', null, container);
            createElement('div', 'pagination-number', '1', this.wrap);
        }

        public redraw(limit: number): void {
            console.log(limit);
            limit > 1 ? this.show() : this.hide();
        }
        public show(): void {
            this.wrap.classList.remove('hide');
        }
        public hide(): void {
            this.wrap.classList.add('hide');
        }
    }
}