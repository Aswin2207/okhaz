import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { GridModel } from 'src/app/models/grid.model';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  filterIndex:number = 0;

  constructor(private http:HttpUtilityService) { 
    this.onTabSelected(0);
  }
  
  ItemsTableConfig:GridModel =  {
    EnableSearch:true,
    tableHeader: 'Products',
    enablePagination: true,
    columns:[] = [
      {
        name:'Checkbox',
        type:'checkbox',
        id:'checkbox'
      },
      {
        name:'Image',
        type:'image',
        id:'image_url'
      },
      {
        name:'Product SKU',
        type:'string',
        id:'itemID',
        sortable:true
      },
      {
        name:'Stock Level',
        type:'string',
        id:'Stock',
        sortable:true
      },
      {
        name:'Product Name',
        type:'string',
        id:'itemName',
        sortable:true
      },
      {
        name:'Price',
        type:'string',
        id:'itemSellingprice',
        sortable:true
      },
      {
        name:'',
        type:'button',
        id:'Status',
        iconClass:'remove_red_eye',
        compareVal:'Active',
        activeClass:'icon-color-green',
        sortable:true,
        usedefaultIcon:true
      },
      {
        name:'',
        type:'button',
        id:'Featured',
        iconClass:'star_outline',
        compareVal:'Featured',
        activeClass:'icon-color-green',
        sortable:true,
        usedefaultIcon:true
      },
      {
        name:'Action',
        type:'action',
        id:'Status'
      }
    ],
    data : [],
    currentPageSize:20,
    tableToolbar:true,
    totalRows:0,
    sortCol:'CreatedDate',
    sortOrder:1
  };

  getDatFromServer(gridModel: any) {
    this.ItemsTableConfig.currentPageSize = gridModel.limit;
    this.http.post(AppconstantsService.ProductAPIs.productListAPi + "/" + this.filterIndex,gridModel).then((data)=>{
      if(data){
        this.setTableData(data,gridModel);
      }
    }
    ,(error)=>{})
  }
  
  setTableData(data: any, gridModel:any) {
    console.log(data);
    this.ItemsTableConfig.data = data.rows;
    this.ItemsTableConfig.totalRows = data.totalRows;
  }

  ngOnInit(): void {
  }

  deleteProductClicked(row:any){
    console.log(row);
  }

  addProductClick(e:any){
    console.log('addProductClick from view page');
  }
  
		
  onTabSelected(tabId:number){
    this.filterIndex = tabId;
    let gridModel = {
      start : 0,
      limit : this.ItemsTableConfig.currentPageSize,
      sortCol : 'itemName',
      sortOrder : 1,
      searchVal: ''
     }
    this.getDatFromServer(gridModel);
  }

  onAnyAction(e:any){
    console.log(e);
    switch(e.action){
      case "click":
        var col = e.columnHeader.id;
        var currentval = e.row[col];
        e.row[col] = this.getNegateVal(currentval);
        this.http.post(AppconstantsService.ProductAPIs.editProductApi, e.row, null, true).then((data)=>{
          console.log(data);
        },(er)=>{
        });
        break;
      case "edit":
        break;
    }
  }

  getNegateVal(val: any): any {
    switch(val) {
      case "Active":
        return "Inactive";
      case "Inactive":
        return "Active";
       default:
        return "Active";
    }
  }

}

