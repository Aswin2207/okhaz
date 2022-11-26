export class GridModel {
    tableHeader: string = '';
    columns: any = [];
    data: any = [];
    totalRows: number;
    sortCol: string;
    sortOrder: number;
    EnableSearch: boolean;
    enablePagination: boolean;
    refreshPagination?: boolean;
    currentPageSize: number = 50;
    tableToolbar: boolean = true
}
