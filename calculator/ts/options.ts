const options = {
    type: "Тип изделия",
    assembly: "Корпус или сборка",
    series: "серия",
    conn1: "тип подсоединения 1",
    conn2: "тип подсоединения 2",
    conn3: "тип подсоединения 3",
    conn4: "тип подсоединения 4",
    size1: "размер подсоединения 1",
    size2: "размер подсоединения 2",
    size3: "размер подсоединения 3",
    size4: "размер подсоединения 4",
    additionalCoverage: "дополнительное покрытие",
    cleaningUnderOxygen: "очистка под кислород",
    mainMaterial: "основной материал",
    needleType: "тип иглы",
    handleType: "тип рукоятки",
    surfaceType: "тип поверхности",
    sealMaterial: "материал уплотнения",
    geometricConfiguration: "геометрическая конфигурация изделия",
    loadOption: "опция постоянной нагрузки у NV вентелей",
    panelMounting: "крепление на панель",
    pressureOption345b: "опция давления у NV",
    darinageOption: "опция дренажа",
    connectionPlug: "заглушка подсоединения",
    handleColor: "цвет рукоятки",
    driveType: "тип привода",
    conditionalPassageDiameter: "нестандартное ДУ",
    filterType: "тип фильтра",
    springType: "тип пружины",
    perssureValveSetting: "давление настройки клапана",
    highPressureOption: "опция высокого давления",
    len: "опция длины фитинга",
    zcrConnectionOption: "опция плечиков у подсоеднения у ZCR",
    meltingPoint: "Температура плавления защитного материала заглушки",
    plasticBodyColor: "цвет у брс",
}

interface connections {
    connectionNo: number,
    connectionType: string,
    connectionSize: string
}

type optionsData = {
    type?: string,
    assembly?: string,
    series?: string,
    additionalCoverage?: string,
    cleaningUnderOxygen?: string,
    mainMaterial?: string,
    needleType?: string,
    handleType?: string,
    surfaceType?: string,
    sealMaterial?: string,
    geometricConfiguration?: string,
    loadOption?: string,
    panelMounting?: string,
    pressureOption345b?: string,
    darinageOption?: string,
    connectionPlug?: string,
    handleColor?: string,
    driveType?: string,
    conditionalPassageDiameter?: string,
    filterType?: string,
    springType?: string,
    perssureValveSetting?: string,
    highPressureOption?: string,
    len?: string,
    zcrConnectionOption?: string,
    meltingPoint?: string,
    plasticBodyColor?: string,
    connections?: connections[]
}

namespace Components {
    export class Options {
        data: optionsData;
        elems: object = {};
        constructor(wrap: HTMLElement) {
            console.log('opt', options);
            Promise.all([
                fetch('/type', {}),
                fetch('/assembly'),
                fetch(''),
                fetch(''),
            ]).then(response => {
                let i = 0;
                for (const key in options) {
                    this.elems[key] = new Select(wrap, options[key], key, response[i++]);
                    this.elems[key].on('change', () => { this.send(); });
                }
            });
        }

        private collectData(exception: string): optionsData {
            let data: optionsData = {};
            for (const key in this.elems) {
                if (key === exception) {
                    // delete data[key];
                    continue;
                }
                data[key] = this.elems[key].getValue();
            }
            return data;
        }

        private redrawSelects(dataResp): void {
            let i = 0;
            for (const key in options) {
                this.elems[key].redraw(dataResp[i++]);
            }
        }

        private send() {
            Promise.all([
                fetch('/type', this.collectData('type')),
                fetch('/assembly'),
                fetch(''),
                fetch(''),
            ]).then(responses => {
                this.redrawSelects(responses);
            })
        }
    }
}
