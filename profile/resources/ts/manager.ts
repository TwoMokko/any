namespace Components {
    export class Manager {
        public static managerWindow         : Instance;
        public static windowOk              : Instance;
        constructor() {

        }

        public static open(id: number): void {
            fetch(`${appDomain}/manager/${id}`)
                .then(async response => {
                    let result = await response.json();

                    const title = 'Связаться с менеджером';
                    const action = './test.php';
                    const form = Manager.getContent(result, action);

                    Manager.managerWindow = Window.create(title, form);
                });
        }

        public static getContent(data, action: string): HTMLElement {
            const form: HTMLFormElement = document.createElement('form');
            form.className = 'manager';
            form.action = action;

            createElement('div', 'manager-head', `${data.name} ${data.surname} (${data.position})`, form);

            const infoWrap = createElement('div', 'manager-info', null, form);

            const imgWrap = createElement('div', null, null, infoWrap);
            const img = createElement('img', null, null, imgWrap);
            img.src = data.image;

            const info = createElement('div', 'manager-info-text', null, infoWrap);
            const row1 = createElement('div', null, null, info);
            const row2 = createElement('div', null, null, info);
            const row3 = createElement('div', null, null, info);
            createElement('div', null, 'email:', row1);
            createElement('div', null, data.email, row1);
            createElement('div', null, 'Телефон:', row2);
            createElement('div', null, data.phone, row2);
            createElement('div', null, 'whats app:', row3);
            createElement('div', null, data.whats_app, row3);

            createElement('div', null, 'Сообщение на email:', form);

            const textareaWrap = createElement('div', null, null, form);
            const textarea = createElement('textarea', null, null, textareaWrap);
            setAttributes(textarea, { 'name': 'message' });

            Manager.createBtnSend(form);

            return form;
        }

        public static createBtnSend(form: HTMLFormElement): void {
            const button = createElement('button', 'btn accent', 'Отправить', form);
            setAttributes(button, { 'type': 'submit' });
            button.onclick = () => {
                Base.Request.sendForm(form, 'POST', () => { Manager.sendOk(); });
                return false;
            };
        }

        public static sendOk(): void {
            Manager.managerWindow.close();

            const messageOk = document.createElement('div');
            messageOk.textContent = 'Отправлено';
            messageOk.className = 'send-ok';

            Manager.windowOk = Window.create(null, messageOk);
        }
    }
}