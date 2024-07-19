const options = {
    type: "Тип изделия",
    assembly: "Корпус или сборка",
    series: "серия",
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

const connections = [
    {
        connectionTypes: {
            name: 'conn1',
            head: 'тип подсоединения 1',
        },
        connectionSizes: {
            name: 'size1',
            head: 'размер подсоединения 1',
        }
    },
    {
        connectionTypes: {
            name: 'conn2',
            head: 'тип подсоединения 2',
        },
        connectionSizes: {
            name: 'size2',
            head: 'размер подсоединения 2',
        }
    },
    {
        connectionTypes: {
            name: 'conn3',
            head: 'тип подсоединения 3',
        },
        connectionSizes: {
            name: 'size3',
            head: 'размер подсоединения 3',
        }
    },
    {
        connectionTypes: {
            name: 'conn4',
            head: 'тип подсоединения 4',
        },
        connectionSizes: {
            name: 'size4',
            head: 'размер подсоединения 4',
        }
    },
]


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
    connections?: connections[],
    physicalCharacteristics?: object
}

type elements = {
    options: object,
    connections: {
        types: object,
        sizes: object
    },
    physicalCharacteristics: object
};