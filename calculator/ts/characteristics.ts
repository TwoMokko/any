namespace Components {

    const characteristics = [
        {
            head: 'Temp min',
            name: 'minTemperature'
        },
        {
            head: 'Давление min',
            name: 'pressMin'
        },
        {
            head: 'Cv',
            name: 'cv'
        },
        {
            head: 'ДавлКорп',
            name: 'bodyPressure'
        },
        {
            head: 'Temp max',
            name: 'maxTemperature'
        },
        {
            head: 'Давление max',
            name: 'pressMax'
        },
        {
            head: 'Dn',
            name: 'dn'
        },
    ]
    export class Characteristics {
        private elems           : object = {};
        constructor(wrap: HTMLElement) {
            this.init(wrap);
        }

        private init(wrap: HTMLElement): void {
            for (const element of characteristics) {
                const inputWrap = createElement('div', 'character-group-select', null, wrap);
                const head = createElement('div', null, element.head, inputWrap);
                this.elems[element.name] = createElement('input', null, null, inputWrap);
            }
        }

        public getValues(): object {
            let out = {}
            for (const element of characteristics) {
                if (this.elems[element.name].value) out[element.name] = this.elems[element.name].value;
            }
            return out;
        }
    }
}