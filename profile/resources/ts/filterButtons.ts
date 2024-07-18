namespace Components {
    export class FilterButtons {
        private doFilter                : HTMLElement;
        private doReset                   : HTMLElement;

        private callSend                : Function;
        constructor(container: HTMLElement, func: Function, filterManager: FilterManager) {
            const filterWrap = createElement('div', 'filter-buttons', null, container)
            this.callSend = func;

            this.init(filterWrap);
            this.addEvents(filterManager);
        }

        private init(filterWrap: HTMLElement): void {
            this.doFilter = createElement('button', 'btn accent', 'Фильтровать', filterWrap);
            this.doFilter.setAttribute('type', 'submit');

            this.doReset = createElement('button', 'btn secondary', 'Сбросить', filterWrap);

        }

        private addEvents(filterManager: FilterManager): void {
            this.doFilter.onclick = () => {
                this.callSend('doFilter', filterManager);
                return false;
            };
            this.doReset.onclick = () => {
                this.callSend('doReset', filterManager);
                return false;
            };
        }
    }
}