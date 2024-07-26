namespace Components {
    export class Checkboxes {
        private data                : object;

        private head                : HTMLElement;
        constructor(wrap: HTMLElement, textContent: string, key: string, data: object) {

            this.head = createElement('div', null, textContent, wrap);
            const checkboxesWrap = createElement('div', 'option-group-select', null, wrap);

            this.createCheckboxes(checkboxesWrap, data);
        }
        public getValue(): object {
            return this.data;
        }

        private updateData(): void {

            console.log('update data: ', this.data);
        }

        private createCheckboxes(checkboxesWrap:HTMLElement, data: object): void {
            console.log('create checkboxes: ', data)
        }

        public async redrawType(dataResp): Promise<void> {
            console.log('redraw type');
            // dataResp.then(
            //     result => {
            //         // console.log(result);
            //         this.head.style.backgroundColor = 'transparent';
            //         for (const key in this.list) {
            //             this.list[key].style.backgroundColor = 'transparent';
            //
            //             for (let i = 0; i < result.length; i++) {
            //                 if (result[i] === key) {
            //                     this.list[key].style.backgroundColor = 'darkseagreen';
            //
            //                     // Много раз это делается в цикле, переписать
            //                     this.head.style.backgroundColor = 'darkseagreen';
            //                 }
            //             }
            //         }
            //     }
            // )
        }

        public on(event: string, handler: Function) {
            this.updateData();
            // .addEventListener(event, () => {
            //     // TODO: обновить данные
            //     this.updateData();
            //     handler();
            // });
        }
    }
}