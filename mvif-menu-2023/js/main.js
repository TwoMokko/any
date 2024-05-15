"use strict";
document.addEventListener("DOMContentLoaded", () => {
    new SimpleSearch();
});
class SimpleSearch {
    currentSimpleSearch;
    countChildren;
    maxPage;
    previousPage;
    currentPage;
    nextPage;
    constructor() {
        this.countChildren = document.querySelector('.sisea-results-list').childElementCount;
        if (this.countChildren === 0)
            this.setSimpleSearch('0');
        else {
            this.currentPage = document.querySelector('.my-current-page');
            let paging = document.querySelector('.my-paging');
            paging.style.display = 'flex';
            this.maxPage = document.querySelector('.sisea-page:last-child > a') ? document.querySelector('.sisea-page:last-child > a').textContent : document.querySelector('.sisea-page:last-child').textContent;
            this.currentSimpleSearch = this.getSimpleSearch();
            this.setCurrentPage();
            this.previousPage = document.querySelector('.my-previous-page');
            this.nextPage = document.querySelector('.my-next-page');
            this.checkPage();
            this.previousPage.addEventListener('click', () => { this.updatePage('previous'); });
            this.nextPage.addEventListener('click', () => { this.updatePage('next'); });
        }
    }
    getSimpleSearch() {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('simplesearch_offset');
    }
    setSimpleSearch(newParam) {
        let url = new URL(window.location.href);
        url.searchParams.set('simplesearch_offset', newParam);
        window.location.href = url.href;
    }
    setCurrentPage() {
        let pageNumber = (Number(this.getSimpleSearch()) + this.countChildren) / this.countChildren;
        this.currentPage.textContent = String(pageNumber);
        if (pageNumber > Number(this.maxPage))
            this.currentPage.textContent = this.maxPage;
        if (pageNumber < 1)
            this.currentPage.textContent = '1';
    }
    updatePage(direction) {
        switch (direction) {
            case 'previous':
                this.currentSimpleSearch = String(Number(this.currentPage.textContent) * this.countChildren - 2 * this.countChildren);
                break;
            case 'next':
                this.currentSimpleSearch = String(Number(this.currentPage.textContent) * this.countChildren);
                break;
            default:
                this.currentSimpleSearch = String();
                break;
        }
        this.checkPage();
        this.setSimpleSearch(this.currentSimpleSearch);
        this.setCurrentPage();
    }
    checkPage() {
        this.previousPage.classList.remove('disable-btn');
        this.nextPage.classList.remove('disable-btn');
        if (Number(this.currentPage.textContent) <= 1)
            this.previousPage.classList.add('disable-btn');
        if (Number(this.currentPage.textContent) >= Number(this.maxPage))
            this.nextPage.classList.add('disable-btn');
    }
}
//# sourceMappingURL=main.js.map