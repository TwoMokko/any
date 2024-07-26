declare namespace Components {
    class Checkboxes {
        private data;
        private head;
        constructor(wrap: HTMLElement, textContent: string, key: string, data: object);
        getValue(): object;
        private updateData;
        private createCheckboxes;
        redrawType(dataResp: any): Promise<void>;
        on(event: string, handler: Function): void;
    }
}
declare function createElement(tagName: string, className: string | null, textContent: string | null, container: HTMLElement | null): any;
declare namespace Components {
    class Options {
        private data;
        private elems;
        private physicalCharacteristics;
        private table;
        private pagination;
        constructor(wrap: HTMLElement);
        private fetchesOptions;
        private fetchesConnections;
        private onChange;
        private collectData;
        private redrawSelectsOptions;
        private redrawSelectsConnections;
        private redrawProductsTable;
        private sendOptions;
        private sendConnections;
        private sendSold;
    }
}
declare namespace Components {
    class Pagination {
        private limitPage;
        private page;
        private pagination;
        private first;
        private previous;
        private current;
        private next;
        private last;
        private callback;
        constructor(wrap: HTMLElement, callback: Function);
        private init;
        private setEvents;
        redraw(limitPage: number): void;
        show(): void;
        hide(): void;
        setPage(number: number): void;
        getPage(): number;
    }
}
declare namespace Components {
    class Select {
        head: HTMLElement;
        select: HTMLSelectElement;
        list: object;
        dataMultiple: any;
        constructor(wrap: HTMLElement, textContent: string, key: string, data: object, type?: boolean);
        private createOptions;
        getValue(): string;
        getValueMultiple(): any;
        private updateDataMultiple;
        redrawOptions(dataResp: any): Promise<void>;
        redrawConnections(dataResp: any): Promise<void>;
        on(event: string, handler: Function): void;
    }
}
declare const dataAttrForTable = "data-db";
declare namespace Components {
    class Table {
        private wrap;
        private table;
        private tbody;
        constructor(wrap: HTMLElement);
        private init;
        hide(): void;
        show(): void;
        redraw(soldProducts: any): void;
    }
}
declare const options: {
    type: string;
    assembly: string;
    series: string;
    additionalCoverage: string;
    cleaningUnderOxygen: string;
    mainMaterial: string;
    needleType: string;
    handleType: string;
    surfaceType: string;
    sealMaterial: string;
    geometricConfiguration: string;
    loadOption: string;
    panelMounting: string;
    pressureOption345b: string;
    darinageOption: string;
    connectionPlug: string;
    handleColor: string;
    driveType: string;
    conditionalPassageDiameter: string;
    filterType: string;
    springType: string;
    perssureValveSetting: string;
    highPressureOption: string;
    len: string;
    zcrConnectionOption: string;
    meltingPoint: string;
    plasticBodyColor: string;
};
declare const connections: {
    connectionTypes: {
        name: string;
        head: string;
    };
    connectionSizes: {
        name: string;
        head: string;
    };
}[];
declare const optionsArray: string[];
interface connections {
    connectionNo: number;
    connectionType: string;
    connectionSize: string;
}
type optionsData = {
    type?: string;
    assembly?: string;
    series?: string;
    additionalCoverage?: string;
    cleaningUnderOxygen?: string;
    mainMaterial?: string;
    needleType?: string;
    handleType?: string;
    surfaceType?: string;
    sealMaterial?: string;
    geometricConfiguration?: string;
    loadOption?: string;
    panelMounting?: string;
    pressureOption345b?: string;
    darinageOption?: string;
    connectionPlug?: string;
    handleColor?: string;
    driveType?: string;
    conditionalPassageDiameter?: string;
    filterType?: string;
    springType?: string;
    perssureValveSetting?: string;
    highPressureOption?: string;
    len?: string;
    zcrConnectionOption?: string;
    meltingPoint?: string;
    plasticBodyColor?: string;
    connections?: connections[];
    physicalCharacteristics?: object;
};
type elements = {
    options: object;
    connections: {
        types: object;
        sizes: object;
    };
    physicalCharacteristics: object;
};
declare namespace Components {
    class Characteristics {
        private elems;
        constructor(wrap: HTMLElement);
        private init;
        getValues(): object;
    }
}
