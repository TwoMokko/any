declare namespace Components {
    class FilterButtons {
        private doFilter;
        private doReset;
        private callSend;
        constructor(container: HTMLElement, func: Function);
        private init;
        private addEvents;
    }
}
type tableData = {
    orders: {
        [key: string]: orders;
    };
    limit: number;
};
interface orders {
    invoiceId: string;
    positions: number;
    orderAmount: string;
    manager: {
        id: number;
        name: string;
        surname: string;
    };
    paymentLink: string;
    paymentStatus: string;
    shipmentStatus: string;
    deliveryStatus: string;
    orderDate: dateForTable;
    shipmentDate: dateForTable;
    paymentDate: dateForTable;
    deliveryDate: dateForTable;
}
type dateForTable = {
    date: string;
    timezone_type: number;
    timezone: string;
};
declare namespace Components {
    class FilterManager {
        private select;
        private filterBtn;
        private table;
        constructor();
        private redrawTable;
        private getData;
    }
}
declare function showNavHeader(btn: HTMLElement): void;
declare function createElement(tagName: string, className: string | null, textContent: string | null, container: HTMLElement | null): any;
declare function setAttributes(element: HTMLElement, attr: object): void;
declare function setEmailFromCookie(input: HTMLInputElement): void;
declare function getCookie(name: string): string;
declare namespace Components {
    class Pagination {
        constructor();
        show(): void;
        hide(): void;
    }
}
type TypeResponseError = {
    state: 'error';
    body: {
        'message': string;
    };
};
type TypeResponseOk = {
    state: 'ok';
    body: any;
};
type TypeResponse = TypeResponseOk | TypeResponseError;
declare namespace Base {
    class Request {
        static send(formData: FormData, url: string, method: string, func?: Function): void;
        private static response;
        static sendForm(form: HTMLFormElement, method: string, func?: Function): void;
        static sendData(data: {
            [key: string]: string | boolean | number;
        }, url: string, method: string, func?: Function): void;
    }
}
declare namespace Components {
    class Select {
        sourceSelect: HTMLSelectElement;
        sourceOptions: NodeList;
        private readonly header;
        private list;
        private isOpen;
        private isSelect;
        private readonly duration;
        constructor(sourceSelect: HTMLSelectElement);
        private createOptions;
        private doClickOnOption;
        private switchSelect;
        private open;
        private close;
        getIsSelect(): boolean;
        private slideToggle;
    }
}
declare namespace Components {
    class Table {
        private data;
        private container;
        private tbody;
        private tr;
        constructor(container: HTMLElement, data: tableData);
        private init;
        redraw(): void;
        redrawRow(trTarget: HTMLElement, data: any): void;
        private sortOnDate;
        private createSubRowTable;
        private fillSubRowTable;
        private createSubRowTotal;
        private createSubRowDocs;
        private fillSubRowDocs;
        private onclickTableRow;
        private sendDataOnclickRow;
    }
}
