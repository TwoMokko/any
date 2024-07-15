namespace Components {
    export class Pagination {
        private limitPage       : number;
        private page            : number;

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
            console.log('реализовать пагинацию');
        }

        private init(wrap: HTMLElement): void {
            const pagination = createElement('div', 'pagination', null, wrap);
            this.first = createElement('div', '', 'первая страница', pagination);
            this.previous = createElement('div', '', '<-', pagination);
            this.current = createElement('div', '', this.page.toString(), pagination);
            this.next = createElement('div', '', '->', pagination);
            this.last = createElement('div', '', 'последняя страница', pagination);

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

            this.current.textContent = this.page.toString();

            /* TODO: когда this.page = 1 || this.page = limit запретить нажимать предыдущая и след */
        }

        public getPage(): number {
            return this.page;
        }
    }
}