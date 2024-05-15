declare class SimpleSearch {
    currentSimpleSearch: string;
    countChildren: number;
    maxPage: string;
    previousPage: HTMLElement;
    currentPage: HTMLElement;
    nextPage: HTMLElement;
    constructor();
    private getSimpleSearch;
    private setSimpleSearch;
    private setCurrentPage;
    private updatePage;
    private checkPage;
}
