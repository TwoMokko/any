namespace Components {
    export class Pagination {
        private limitPage       : number;
        private page            : number;

        private pagination      : HTMLElement;
        private first           : HTMLElement;
        private previous        : HTMLElement;
        private current         : HTMLElement;
        private next            : HTMLElement;
        private last            : HTMLElement;

        private callback        : Function;

        constructor(wrap: HTMLElement, callback: Function) {
            this.callback       = callback;
            this.page           = 1;

            this.init(wrap);
        }

        private init(wrap: HTMLElement): void {
            this.pagination = createElement('div', 'pagination', null, wrap);
            this.first = createElement('div', '', 'первая страница', this.pagination);
            this.previous = createElement('div', '', '<-', this.pagination);
            this.current = createElement('div', '', this.page.toString(), this.pagination);
            this.next = createElement('div', '', '->', this.pagination);
            this.last = createElement('div', '', 'последняя страница', this.pagination);

            this.setEvents();
        }

        private setEvents(): void {
            this.first.addEventListener('click', () => { this.page = 1; this.callback(); });
            this.previous.addEventListener('click', () => { this.page--; this.callback(); });

            this.next.addEventListener('click', () => { this.page++; this.callback(); });
            this.last.addEventListener('click', () => { this.page = this.limitPage; this.callback(); });
        }

        public redraw(limitPage: number): void {
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