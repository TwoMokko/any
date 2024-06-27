namespace Components {
    export class FilterButtons {
        private doFilter                : HTMLElement;
        private doReset                   : HTMLElement;

        private callSend                : Function;
        constructor(container: HTMLElement, func: Function) {
            const filterWrap = createElement('div', 'filter-buttons', null, container)
            this.callSend = func;

            this.init(filterWrap);
            this.addEvents();
        }

        private init(filterWrap: HTMLElement): void {
            this.doFilter = createElement('button', 'btn accent', 'Фильтровать', filterWrap);
            this.doFilter.setAttribute('type', 'submit');

            this.doReset = createElement('button', 'btn secondary', 'Сбросить', filterWrap);

        }

        private addEvents(): void {
            this.doFilter.onclick = () => {
                Base.Request.sendForm(this.doFilter.closest('form'), 'POST', () => { console.log('do filter') });
                this.callSend();
                return false;
            };
            this.doReset.onclick = () => {
                this.callSend();
                return false;
            };
        }
    }
}