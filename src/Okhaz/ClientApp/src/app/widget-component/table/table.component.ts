import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { GridModel } from '../../models/GridModel';
import { CoreService } from '../../service/core/core.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentInit {

  @Output("reloadData") onDataReload: EventEmitter<any> = new EventEmitter();
  @Output("addClick") onAdd: EventEmitter<any> = new EventEmitter();
  @Output("deleteClick") onDelete: EventEmitter<any> = new EventEmitter();
  @Output("onAnyAction") onAnyAction: EventEmitter<any> = new EventEmitter();
  @Output("filterData") filterData: EventEmitter<any> = new EventEmitter();
  @Input() showDateFilter: boolean = false;
  @Input() height: string;
  @Input() showBackgroundImage: boolean = false;
  @Input() cardType: string = '';
  @Input() showCard: boolean = true;
  @Input() selectedRow: any = {};
  @Input() config: GridModel = {
    tableHeader: '',
    columns: [] = [],
    data: [] = [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1,
    EnableSearch: true,
    enablePagination: true,
    refreshPagination: false,
  };
  columnNames: any = {};
  dateFilterOptions = [{
    id:"7days",
    label: "Last 7 Days"
  },{
    id:"2days",
    label: "Last 2 Days"
  },{
    id:"range",
    label: "Date Range"
  }]
  selectedDateValue = "7days";
  startDate: Date;
  endDate: Date;
  sortColumn: string = ""
  sortOrder: number = 1;
  selectedRowId: number = -1;
  searchVal: string = "";
  page: number = 0;
  showType: string = 'list';
  actionRow: any;
  actionHeader: any;
  allCheck: boolean = false;
  todayDate = new Date().toISOString().split("T")[0];
  checkedRows: any = {};
  allRows: any = [];
  fullData: any = []
  pageSizeOptions = [10, 20, 50, 100];
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  a = 0;
  b = this.config.currentPageSize;

  c = 0;
  d = this.config.currentPageSize;
  constructor(private coreService: CoreService) { }

  ngAfterContentInit(): void {
    this.allRows = this.config.data;
  }

  ngOnInit() {
    this.config.columns.map(x => this.displayedColumns.push(x.id));
    this.config.columns.map(x => this.columnNames[x.id] = x.name); 
  }

  dateFilter() {
    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate()-7);
    var dateRange = {
      startDate: defaultDate,
      endDate: new Date()
    }
    if(this.selectedDateValue == '7days') {
      var startDate = new Date();
      startDate.setDate(startDate.getDate()-7);
      dateRange = {
        startDate: startDate,
        endDate: new Date()
      }
    } else if(this.selectedDateValue == '2days') {
      var startDate = new Date();
      startDate.setDate(startDate.getDate()-2);
      dateRange = {
        startDate: startDate,
        endDate: new Date()
      }
    } else {
      dateRange = {
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      }
    }
    if(dateRange.startDate>dateRange.endDate){
      alert("Start date should be less than end date");
      return;
    }
    console.log(dateRange);
    this.filterData.emit({daterange:dateRange})
  }

  onSort(header: any) {
    if (header.sortable) {
      for (let columnHeader of this.config.columns) {
        if (columnHeader.id != header.id) {
          columnHeader.sortOrder = 0;
        }
        else {
          if (columnHeader.sortOrder == 1) {
            columnHeader.sortOrder = -1;
          }
          else {
            columnHeader.sortOrder = 1;
          }
          this.sortColumn = columnHeader.id;
          this.sortOrder = columnHeader.sortOrder;
          if (this.sortOrder == 1) {
            this.config.data.sort((a, b) => a[this.sortColumn] - b[this.sortColumn]);
          } else {
            this.config.data.sort((a, b) => b[this.sortColumn] - a[this.sortColumn]);
          }
        }
      }
    }
  }
  
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  getDate(date: any) {
    if (!date) {
      return;
    }
    return date.split(" ")[0];
  }

  searchInput() {
    var searchValue = this.searchVal;
    if (searchValue.length <= 1) {
      this.allRows = this.config.data;

      if (this.fullData.length == 0)
        this.fullData = Object.create(this.config.data);
    }
  }

  searchColumn() {
    var searchValue = this.searchVal;
    if (searchValue == "" || this.config.refreshPagination) {
      this.tableRefresh();
      return;
    }

    this.allRows = Object.create(this.fullData);
    console.log('allRows', this.fullData);
    this.config.data = this.filter(this.allRows, searchValue);
    this.page = 0;
    this.config.totalRows = this.config.data.length;
  }

  filter(data: any, inputValue: string) {
    return data.filter((element) => this.checkState(element, inputValue));
  }

  checkState(element: any, inputValue: string) {
    const filterValues = inputValue.trim().split(' ');
    const states: boolean[] = [];

    for (let index = 0; index < filterValues.length; index++) {
      states[index] = this.getState(element, filterValues[index]);
    }

    return states.every(state => state === true);
  }

  getState(data: any, inputValue: string, state = false) {
    for (const value of Object.values(data)) {
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0 && state === false) {
        state = this.getState(value, inputValue, state);
      } else {
        if (value && state === false) {
          state = JSON.stringify(value).toLowerCase().includes(inputValue.toLowerCase());
        } else {
          return state;
        }
      }
    }
    return state;
  }

  onEditProduct(data: any) {
  }

  deleteProduct(i: any) {
  }

  selectRow(i: any, row: any) {
    this.selectedRowId = i;
    this.selectedRow = row;
    this.onAnyAction.emit({ row: row, action: 'rowSelected', index: i });
  }

  printLog(d: any) {
    console.log(d)
  }

  addNewRow() {
    this.onAdd.emit();
  }

  onDeleteClick() {
    var selectRows = [];
    for (var key in this.checkedRows) {
      if (this.checkedRows[key]) {
        selectRows.push(this.checkedRows[key])
      }
    }
    if (selectRows.length > 0) {
      this.onDelete.emit(selectRows);
    }
  }

  productShowType(type: string) {
    this.showType = type;
    this.cardType = "user";
  }

  onPageChange(pageData: any) {
    this.a = pageData.pageIndex * pageData.pageSize;
    this.b = this.a + pageData.pageSize;
    if (this.config.refreshPagination) {
      this.page = pageData.pageIndex;
      this.tableRefresh();
    } else {
      this.c = pageData.pageIndex * pageData.pageSize;
      this.d = this.c + pageData.pageSize;
    }
  }

  setActionRow(row: any, columnHeader: any, i: number, action: string = '') {
    this.actionRow = row;
    this.actionHeader = columnHeader;
    this.selectedRowId = i;
    this.onAnyAction.emit({ row: row, action: action, index: i });
  }

  actionBtnClick(action: string) {
    this.onAnyAction.emit({ row: this.actionRow, columnHeader: this.actionHeader, action: action, index: this.selectedRowId });
  }

  colButtonClick(row: any, columnHeader: any, index: number) {
    this.onAnyAction.emit({ row: row, columnHeader: columnHeader, action: 'click', index: index });
  }

  tableRefresh() {
    let gridModel = {
      start: this.page * this.config.currentPageSize,
      limit: this.config.currentPageSize,
      sortCol: this.sortColumn,
      sortOrder: this.sortOrder,
      searchVal: this.searchVal
    }
    this.onDataReload.emit(gridModel);
  }

  showMyself(i: number, show: boolean) {
    return show;
  }

  /**
    * Whether the number of selected elements matches the total number of rows.
    */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.config.data.length;
    return numSelected === numRows;
  }

  /**
    * Selects all rows if they are not all selected; otherwise clear selection.
    */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.config.data.forEach(row => this.selection.select(row));
  }

  /**
    *onDelete method is used to open a delete dialog.
    */
  onDeleteRow(i) {
    this.coreService.deleteDialog("Are you sure you want to delete this user permanently?").
      subscribe(res => { console.log(res) },
        err => console.log(err),
        () => console.log(''))
  }

}
