import { Component, OnInit } from '@angular/core';
import { GridModel } from '../../../models/grid.model';
import { AppconstantsService } from '../../../service/appconstants.service';
import { HelperService } from '../../../service/helper.service';
import { HttpUtilityService } from '../../../service/httputility.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private http: HttpUtilityService, private helper: HelperService) {
    let gridModel = {
      start: 0,
      limit: this.TableConfig.currentPageSize,
      sortCol: 'itemName',
      sortOrder: 1,
      searchVal: ''
    }
    this.getDatFromServer(gridModel);
  }

  showAddBrand = false;

  ngOnInit(): void {
  }

  deleteBrandClicked(row: any) {
    console.log(row);
  }

  addBrandClick(e: any) {
    this.showAddBrand = true;
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "click":
       
        break;
      case "edit":
        break;
    }
  }

  brandsInfo: any =
    {
      fieldId: "BrandName",
      label: "Brand Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide Brand Name",
      required: true,
      rows: 5
    };

  TableConfig: GridModel = {
    EnableSearch: true,
    tableHeader: 'Products',
    columns: [] = [
      {
        name: 'Checkbox',
        type: 'checkbox',
        id: 'checkbox'
      },
      {
        name: 'Brand Name',
        type: 'string',
        id: 'BrandName'
      },
      {
        name: 'Products',
        type: 'string',
        id: 'ProductCount',
        sortable: true
      },
      {
        name: 'Action',
        type: 'action',
        id: 'Status'
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: 'CreatedDate',
    sortOrder: 1,
    enablePagination:false
  };

  getDatFromServer(gridModel: any) {
    this.TableConfig.currentPageSize = gridModel.limit;
    this.http.post(AppconstantsService.BrandInfo.brandList, gridModel).then((data) => {
      if (data) {
        this.setTableData(data, gridModel);
      }
    },(error) => { })
  }

  setTableData(data: any, gridModel: any) {
    this.TableConfig.data = data.rows;
    this.TableConfig.totalRows = data.totalRows;
  }

  saveBrand() {
    if (this.brandsInfo.fieldValue) {
      var brands = this.brandsInfo.fieldValue.split(',');
      var json = [];
      for (var i = 0; i < brands.length; i++) {
        json.push({ BrandName: brands[i], BrandId : this.helper.pad((this.TableConfig.totalRows + i + 1),4) })
      }
      this.http.post(AppconstantsService.BrandInfo.brandAdd, json ).then((data) => {
        if (data) {
          this.helper.showSuccessTostMessage("Added brand successfully");
          this.brandsInfo.fieldValue = '';
          let gridModel = {
            start: 0,
            limit: this.TableConfig.currentPageSize,
            sortCol: 'itemName',
            sortOrder: 1,
            searchVal: ''
          }
          this.getDatFromServer(gridModel);
          this.showAddBrand = false;
        }
      })
    }
  }

}
