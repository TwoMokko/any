namespace Components {
    export class Pagination {
        constructor(container: HTMLElement) {
            this.init(container);
        }
        private init(container: HTMLElement): void {
            const wrap = createElement('div', 'pagination-wrap container', null, container);
            createElement('div', 'pagination-number', '1', wrap);
        }
        public show(): void {

        }
        public hide(): void {

        }
    }
}