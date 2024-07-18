namespace Components {

    /**
     * Менеджер работы с окнами
     */
    export class Window {
        private static windows: object = {};
        private static iter: number = 0;
        public static windowsHTML: Element = null;
        public static content: Element = null;

        // public static showMessage(text: string): Instance {
        //     return Window.create(null, text);
        // }

        public static create(title: string | null = null, content: Element): Instance {
            document.querySelector('body').style.overflow = 'hidden';
            if (!Window.windowsHTML) {
                Window.windowsHTML = document.createElement('div');
                this.windowsHTML.className = 'windows';
                document.querySelector('main').append(
                    Window.windowsHTML
                );
            }

            this.content = content;
            this.content.classList.add('active');


            let id = ++Window.iter;
            let wind = new Instance(id, title, this.content);
            Window.windows[id] = wind;
            return wind;
        }

        public static remove(id: number): void {
            document.querySelector('body').style.overflow = 'revert';
            delete Window.windows[id];
        }

    }

    /**
     * Работа с окнами
     */
    export class Instance {
        private readonly id: number;
        private readonly instance: Element;

        constructor(id: number, title: string | null, content: Element | string) {
            this.id                                     = id;
            this.instance                               = document.createElement('div');
            let space                                   : Element = document.createElement('div');
            let window                                  : Element = document.createElement('div');
            let header                                  : Element = document.createElement('div');
            let titleHTML                               : Element = document.createElement('div');
            let closeHTML                               : Element = document.createElement('div');
            let container                               : Element = document.createElement('div');
            this.instance.className                     = 'instance';
            space.className                             = 'space';
            window.className                            = 'window';
            titleHTML.className                         = 'title';
            closeHTML.className                         = 'close';

            (title !== null) ? header.className = 'head' : header.className = 'head_null_title';
            (title !== null) ? container.className = 'container' : container.className = 'container_null_title';

            this.instance.append(space);
            this.instance.append(window);
            window.append(header);
            if (title !== null) {
                header.append(titleHTML);
                titleHTML.append(title);
            }
            header.append(closeHTML);
            window.append(container);
            container.append(content);

            space.addEventListener('click', this.close.bind(this));
            closeHTML.addEventListener('click', this.close.bind(this));

            Window.windowsHTML.append(this.instance);
        }

        public close(): void {
            this.instance.remove();
            this.remove();
        }

        private remove(): void {
            Window.remove(this.id);
        }

    }

}
