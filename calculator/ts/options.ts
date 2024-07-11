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

const optionsArray = [
    'type',
    'assembly',
    'series',
    'additionalCoverage',
    'cleaningUnderOxygen',
    'mainMaterial',
    'needleType',
    'handleType',
    'surfaceType',
    'sealMaterial',
    'geometricConfiguration',
    'loadOption',
    'panelMounting',
    'pressureOption345b',
    'darinageOption',
    'connectionPlug',
    'handleColor',
    'driveType',
    'conditionalPassageDiameter',
    'filterType',
    'springType',
    'perssureValveSetting',
    'highPressureOption',
    'len',
    'zcrConnectionOption',
    'meltingPoint',
    'plasticBodyColor',
]

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
            this.fetches(wrap).then(r => {

            });
        }

        private async fetches(wrap: HTMLElement): Promise<void> {
            let requests = optionsArray.map(name => fetch(`http://192.168.0.178:5049/products/options/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            }));

            Promise.all(requests).then(async responses => {
                let result = responses.map(async r => await r.json())

                let i = 0;
                for (const key in options) {
                    if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;

                    this.elems[key] = new Select(wrap, options[key], key, result[i++]);
                    this.elems[key].on('change', async () => {
                        await this.send();
                    });
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
                const value = this.elems[key].getValue();
                if (value !== '') data[key] = value;
            }

            return data;
        }

        private redrawSelects(dataResp): void {
            let i = 0;
            for (const key in options) {
                if (key === 'conn1' || key === 'conn2' || key === 'conn3' || key === 'conn4' || key === 'size1' || key === 'size2' || key === 'size3' || key === 'size4') continue;

                this.elems[key].redraw(dataResp[i++]);
            }
        }

        private async send() {
            let requests = optionsArray.map(name => fetch(`http://192.168.0.178:5049/products/options/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.collectData(name))
            }));

            Promise.all(requests).then(async responses => {
                let result = responses.map(async r => await r.json());
                this.redrawSelects(result);
                // console.log(result);
            })
        }
    }
}
