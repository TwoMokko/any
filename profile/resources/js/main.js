"use strict";
document.addEventListener("DOMContentLoaded", () => {
});
function showNavHeader(btn) {
    const dropList = btn.closest('.drop-wrap').querySelector('.drop-list');
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        dropList.classList.remove('active');
    }
    else {
        btn.classList.add('active');
        dropList.classList.add('active');
    }
}
function createElement(tagName, className, textContent, container) {
    let elem = document.createElement(tagName);
    if (className)
        elem.className = className;
    if (textContent)
        elem.textContent = textContent;
    if (textContent)
        elem.textContent = textContent;
    if (container)
        container.append(elem);
    return elem;
}
var Base;
(function (Base) {
    class Request {
        static send(formData, url, method, func) {
            fetch(url, {
                method: method,
                body: formData
            })
                .then(async (response) => {
                let json = await response.json();
                Request.response(json, func);
            })
                .catch(response => { console.log('request failed: ' + url); console.log(response); });
        }
        static response(response, func) {
            switch (response.state) {
                case 'ok':
                    if (func)
                        func(response.body);
                    break;
                case 'error':
                    alert(response.body.message);
                    break;
            }
        }
        // public static send(formData: FormData, url: string, func?: Function): void {
        //     $.ajax({
        //         url				: url,
        //         method			: 'POST',
        //         dataType		: 'json',
        //         data 			: formData,
        //         contentType		: false,
        //         processData		: false,
        //         cache			: false,
        //         // beforeSend: function() { if (funcBeforeSend) funcBeforeSend(); },
        //         // complete: function() { if (funcComplete) funcComplete(); },
        //         success			: (response) => { if (func) func() },
        //         error			: (response) => { console.log('request failed: ' + url); console.log(response); }
        //     });
        // }
        // public static send(formData: FormData, url: string, method: string = 'POST', func?: Function): void {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open(method, url);
        //     xhr.send(formData);
        //     xhr.onload = () => func();
        //     xhr.onerror = () => alert('Ошибка соединения');
        // }
        static sendForm(form, method, func) {
            let url = form.getAttribute('action');
            let formData = new FormData(form);
            console.log(formData);
            Request.send(formData, url, method, func);
        }
        static sendData(data, url, method, func) {
            let formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key].toString());
            }
            Request.send(formData, url, method, func);
        }
    }
    Base.Request = Request;
})(Base || (Base = {}));
var Components;
(function (Components) {
    class Select {
        sourceSelect;
        sourceOptions;
        header;
        list;
        isOpen; // флаг, состояние: открыт или закрыт селект
        isSelect; // флаг, состояние: выбрано что-то или нет
        duration; // анимация
        constructor(sourceSelect) {
            this.isSelect = false;
            this.isOpen = false;
            this.duration = 450;
            this.sourceSelect = sourceSelect;
            this.sourceOptions = sourceSelect.querySelectorAll('option');
            let headerText;
            this.sourceOptions.forEach((elem) => {
                if (elem.selected)
                    headerText = elem.textContent;
            });
            // sourceSelect.hide();
            /* Create Elements */
            const wrap = createElement('div', 'select-wrap', null, sourceSelect.closest('div'));
            this.header = createElement('div', 'new-select', headerText, wrap);
            this.list = createElement('div', 'new-select-list', null, wrap);
            this.createOptions();
            /* Building DOM */
            // wrap.append(
            //     this.header,
            //     this.list.append(
            //         this.getOptions()
            //     )
            // );
            /* Events */
            this.header.addEventListener('click', () => {
                if (this.header.classList.contains('disabled')) {
                    return;
                }
                // this.switchSelect();
            });
            sourceSelect.after(wrap);
            // this.list.slideUp(0);
        }
        // public static factory($sourceSelect: JQuery): Select[] {
        //     let $out: Select[] = [];
        //     for (let i: number = 0; i < $sourceSelect.length; i++) {
        //         let select: Select = new Select($sourceSelect.eq(Number(i)));
        //         $out.push(select);
        //     }
        //     return $out;
        // }
        //
        createOptions() {
            this.sourceOptions.forEach((elem) => {
                const option = createElement('div', 'new-select-list-item', elem.textContent, this.list);
                option.addEventListener('click', (event) => {
                    this.doClickOnOption(event.target);
                });
            });
        }
        doClickOnOption(event) {
            this.header.textContent = event.textContent;
            this.sourceOptions.forEach((elem) => {
                if (elem.selected)
                    elem.selected = false;
                if (elem.textContent === event.textContent)
                    elem.selected = true;
            });
            // $sourceOption.trigger('change'); это если на change есть событие
        }
    }
    Components.Select = Select;
})(Components || (Components = {}));
//# sourceMappingURL=main.js.map