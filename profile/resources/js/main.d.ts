declare function showNavHeader(btn: HTMLElement): void;
declare function createElement(tagName: string, className: string | null, textContent: string | null, container: HTMLElement | null): any;
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
