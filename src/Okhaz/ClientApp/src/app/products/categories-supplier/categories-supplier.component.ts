import { Component, OnInit } from '@angular/core';
import { GridModel } from 'app/models/grid.model';
import { AppconstantsService } from 'app/service/core/appconstants.service';
import { HelperService } from 'app/service/core/helper.service';
import { HttpUtilityService } from 'app/service/core/httputility.service';

@Component({
  selector: 'app-categories-supplier',
  templateUrl: './categories-supplier.component.html',
  styleUrls: ['./categories-supplier.component.scss']
})
export class CategoriesSupplierComponent implements OnInit {

  categoryData: any = {};
  catSelected: boolean = false;
  suplierDetails: any;

  constructor(private http: HttpUtilityService, private helper: HelperService) { }

  supplierData: GridModel = {
    EnableSearch: false,
    tableHeader: 'Suppliers',
    columns: [] = [
      //{
      //  name: 'Id',
      //  type: 'string',
      //  id: 'suppID',
      //  showSubRowIcon: true
      //},
      {
        name: 'Name',
        type: 'string',
        id: 'suppName',
        showSubRowIcon: true
      },
      {
        name: 'Mobile',
        type: 'string',
        id: 'suppMob',
        showSubRowIcon: true
      },
      //{
      //  name: 'Fax',
      //  type: 'string',
      //  id: 'suppFax'
      //},
    
    ],
    data: [] = [],
    currentPageSize: 20,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1,
    tableToolbar: false,
    enablePagination:false
  }

  rowClicked(e) {
    this.catSelected = true;
    this.getSUpplier(e.row.CategoryId);
  }

  closeSupplierView() {
    this.catSelected = false;
  }

  getSUpplier(catId: any) {
    this.http.get(AppconstantsService.Supplier.GetSupplier + "/" + catId).then(
      (data) => {
        this.supplierData.data = data;
        console.log(data);
    }, (error) => {

    })
  }

  ngOnInit(): void {
  }

}
