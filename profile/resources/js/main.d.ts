declare function showNavHeader(btn: HTMLElement): void;
declare function createElement(tagName: string, className: string | null, textContent: string | null, container: HTMLElement | null): any;
declare function setEmailFromCookie(input: HTMLInputElement): void;
declare function getCookie(name: string): string;
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
}
