document.addEventListener("DOMContentLoaded", () => {

})

function showNavHeader(btn: HTMLElement): void {
    const dropList: HTMLElement = btn.closest('.drop-wrap').querySelector('.drop-list');
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        dropList.classList.remove('active');
    } else {
        btn.classList.add('active');
        dropList.classList.add('active');
    }
}

function createElement(tagName: string, className: string|null, textContent: string|null, container: HTMLElement|null): any {
    let elem: HTMLElement = document.createElement(tagName);
    if (className) elem.className = className;
    if (textContent) elem.textContent = textContent;
    if (textContent) elem.textContent = textContent;
    if (container) container.append(elem);
    return elem;
}