namespace Components {
    export class Pagination {
        // private wrap            : HTMLElement;

        private limitPage       : number;
        private page            : number;

        private pagination      : HTMLElement;
        private first           : HTMLElement;
        private previous        : HTMLElement;
        private current         : HTMLElement;
        private next            : HTMLElement;
        private last            : HTMLElement;

        private callback        : Function;
        constructor(container: HTMLElement, callback: Function) {
            this.callback       = callback;
            this.page           = 1;

            this.init(container);
        }
        private init(container: HTMLElement): void {
            // this.wrap = createElement('div', 'pagination-wrap container hide', null, container);
            // createElement('div', 'pagination-number', '1', this.wrap);

            this.pagination = createElement('div', 'pagination-wrap container hide', null, container);
            this.first = createElement('div', 'pagination-number', 'первая страница', this.pagination);
            this.previous = createElement('div', 'pagination-number', '<-', this.pagination);
            this.current = createElement('div', 'pagination-number', this.page.toString(), this.pagination);
            this.next = createElement('div', 'pagination-number', '->', this.pagination);
            this.last = createElement('div', 'pagination-number', 'последняя страница', this.pagination);

            this.setEvents();
        }

        private setEvents(): void {
            // TODO: callback переписать аргументы, так быть не должно

            this.first.addEventListener('click', () => { this.page = 1; this.callback(); });
            this.previous.addEventListener('click', () => { this.page--; this.callback(); });

            this.next.addEventListener('click', () => { this.page++; this.callback(); });
            this.last.addEventListener('click', () => { this.page = this.limitPage; this.callback(); });
        }

        public redraw(limit: number): void {
            console.log(limit);
            this.limitPage = limit;

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
        public show(): void {
            this.pagination.classList.remove('hide');
        }
        public hide(): void {
            this.pagination.classList.add('hide');
        }

        public setPage(number: number): void {
            this.page = number;
        }

        public getPage(): number {
            return this.page;
        }
    }
}