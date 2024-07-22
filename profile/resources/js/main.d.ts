declare namespace Components {
    class Filter {
        private select;
        private filterBtn;
        constructor(container: HTMLElement, func: Function, filterManager: FilterManager);
        private createElements;
        getData(numberPage: number): any;
        resetInputs(): void;
    }
}
declare namespace Components {
    class FilterButtons {
        private doFilter;
        private doReset;
        private callSend;
        constructor(container: HTMLElement, func: Function, filterManager: FilterManager);
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
declare const appDomain = "https://localhost:8000/api";
declare namespace Components {
    class FilterManager {
        private sendData;
        private filterState;
        private filter;
        private table;
        private pagination;
        constructor();
        private redrawTableFromFilterBtn;
        private updateData;
        private send;
    }
}
declare function showNavHeader(btn: HTMLElement): void;
declare function createElement(tagName: string, className: string | null, textContent: string | null, container: HTMLElement | null): any;
declare function setAttributes(element: HTMLElement, attr: object): void;
declare function getCookie(name: string): string;
declare namespace Components {
    class Manager {
        static managerWindow: Instance;
        static windowOk: Instance;
        constructor();
        static open(id: number): void;
        static getContent(data: any, action: string): HTMLElement;
        static createBtnSend(form: HTMLFormElement): void;
        static sendOk(): void;
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
        constructor(container: HTMLElement, callback: Function);
        private init;
        private setEvents;
        redraw(limit: number): void;
        show(): void;
        hide(): void;
        setPage(number: number): void;
        getPage(): number;
    }
}
declare namespace Components {
    /**
     * Менеджер работы с окнами
     */
    class Window {
        private static windows;
        private static iter;
        static windowsHTML: Element;
        static content: Element;
        static create(title: string | null, content: Element): Instance;
        static remove(id: number): void;
    }
    /**
     * Работа с окнами
     */
    class Instance {
        private readonly id;
        private readonly instance;
        constructor(id: number, title: string | null, content: Element | string);
        close(): void;
        private remove;
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
    class SubTable {
        private orderId;
        constructor();
        redraw(trTarget: HTMLElement, data: any, orderId: string): void;
        private createTable;
        private fillTable;
        private createTotal;
        private createDocs;
        private fillDocs;
        private getFile;
    }
}
declare namespace Components {
    class Table {
        private subTable;
        private readonly tableWrap;
        private wrap;
        private tbody;
        private tr;
        private readonly callbackManager;
        constructor(container: HTMLElement, callbackManager: Function);
        private init;
        redraw(data: tableData): void;
        private sortOnDate;
        private onclickTableRow;
        private sendDataOnclickRow;
    }
}
