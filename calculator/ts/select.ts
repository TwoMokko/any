namespace Components {
    export class Select {
        public head                 : HTMLElement;
        public select               : HTMLSelectElement;
        public list                 : object = {};
        public dataMultiple         : any = [];
        constructor(wrap: HTMLElement, textContent: string, key: string, data: object, type: boolean = false) {
            const selectWrap = createElement('div', 'option-group-select', null, wrap);
            this.head = createElement('div', null, textContent, selectWrap);

            this.select = createElement('select', null, null, selectWrap);
            if (type) this.select.setAttribute('multiple', 'multiple');
            this.select.setAttribute('name', key);

            this.createOptions(data).then();
        }

        private async createOptions(data) {
            createElement('option', null, '', this.select);
            for (const value of await data) {
                this.list[value] = createElement('option', null, value, this.select);
            }
        }

        public getValue(): string {
            return this.select.value;
        }
        public getValueMultiple(): any {
            return this.dataMultiple;
        }
        
        private updateDataMultiple(select: HTMLSelectElement): void {
            // TODO: разобраться с этим

            // const selectedValues = Array.from(select.selectedOptions).map(option => option.value);
            //
            // const opts = select.options;
            // const selected = Array.from(opts).filter(o => o.selected).map(o => o.value);

            this.dataMultiple = [];
            const options = select.options;
            for (let opt of options) {
                if (opt.selected && opt.value !== '')  this.dataMultiple.push(opt.value);
            }
        }

        public async redrawOptions(dataResp): Promise<void> {
           dataResp.then(
               result => {
                   // console.log(result);
                   this.head.style.backgroundColor = 'transparent';
                   for (const key in this.list) {
                       this.list[key].style.backgroundColor = 'transparent';

                       for (let i = 0; i < result.length; i++) {
                           if (result[i] === key) {
                               this.list[key].style.backgroundColor = 'darkseagreen';

                               // Много раз это делается в цикле, переписать
                               this.head.style.backgroundColor = 'darkseagreen';
                           }
                       }
                   }
               }
           )
        }

        public async redrawConnections(dataResp): Promise<void> {
            // console.log(dataResp);

            this.head.style.backgroundColor = 'transparent';
            for (const key in this.list) {
                this.list[key].style.backgroundColor = 'transparent';

                for (let i = 0; i < dataResp.length; i++) {
                    if (dataResp[i] === key) {
                        this.list[key].style.backgroundColor = 'darkseagreen';

                        // Много раз это делается в цикле, переписать
                        this.head.style.backgroundColor = 'darkseagreen';
                    }
                }
            }
        }

        public on(event: string, handler: Function) {
            this.select.addEventListener(event, (ev) => {
                let select: HTMLSelectElement = ev.target as HTMLSelectElement;
                if (select.hasAttribute('multiple')) this.updateDataMultiple(select);
                handler();
            });
        }
    }
}