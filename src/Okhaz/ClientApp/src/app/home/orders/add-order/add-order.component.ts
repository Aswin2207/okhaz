import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridModel } from 'src/app/models/grid.model';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HelperService } from 'src/app/service/helper.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  tab: number = 0;
  selectedIndex: number = 0;
  CustomerEmail: string = "";
  selectedCustomer: any;
  searchVal: any = "";
  customerInfoFields:any[] = [
    {
      fieldId: "existingCustomer",
      label: "Existing Customer",
      fieldValue: "true",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "newCustomer",
      label: "New Customer",
      fieldValue: "false",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "custName",
      label: "Customer Name / Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "cusEmail",
      label: "Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "password",
      label: "Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "confirmPswd",
      label: "Confirm Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//6
      fieldId: "offers",
      label: "Exclusive Offers",
      fieldValue: "",
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "custName",
      label: "First Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "LastName",
      label: "Last Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "companyName",
      label: "Company Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "phoneNumber",
      label: "Phone Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {//11
      fieldId: "cusAdd1",
      label: "Address Line 1",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "cusAdd2",
      label: "Address Line 2",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "City",
      label: "Suburb/City",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {//14
      fieldId: "country",
      label: "Country",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "State",
      label: "State/Province",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "Zipcode",
      label: "Zip/Postcode",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "customerAddres",
      label: "Save to customer's address book",
      fieldValue: false,
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },

  ]
  itemFields:any[] = [
    {
      fieldId: "Search",
      label: "Search by product name, SKU etc",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    }
  ]
  shippingFields:any[] = [
    {
      fieldValue: "billingaddress",
      options:[
        {
          fieldId: "billingaddress",
          label: "Billing Address Specified",
          value: "billingaddress",
          group: 'inventorytracking'
        },
        {
          fieldId: "singleaddress",
          label: "New Single Address",
          value: "singleaddress",
          group: 'inventorytracking'
        },
        {
          fieldId: "multipleaddress",
          label: "New Multiple Address",
          value: "multipleaddress",
          group: 'inventorytracking'
        }
      ],
    },
    {
      fieldId: "firstName",
      label: "First Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "lastName",
      label: "Last Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "companyName",
      label: "Company Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "phoneNumber",
      label: "Phone Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//10
      fieldId: "custAddr1",
      label: "Address Line 1",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "custAddr2",
      label: "Address Line 2",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "city",
      label: "Suburb/City",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "country",
      label: "Country",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: false,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "state",
      label: "State/Province",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "zipcode",
      label: "Zip/Postcode",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customerAddres",
      label: "Save to customer's address book",
      fieldValue: false,
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },

  ]
  finalizeFields:any[] =[
    {
      fieldId: "comments",
      label: "Comments",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide Comments",
      required: false
    },
    {
      fieldId: "stafNotes",
      label: "Staff Notes",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide product Staff Notes",
      required: false
    },
    {
      fieldId: "discount",
      label: "Manual Discount",
      fieldValue: "",
      type: "number",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "couponOrGift",
      label: "Coupon or Gift Certificate",
      fieldValue: "",
      type: "number",
      isValid: true,
      errorMesg: "",
      required: false,
    },
  ]
  popupCustomProdFlds:any[] = [
    {
      fieldId: "name",
      label: "Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "sku",
      label: "SKU",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      label: "Item Price",
      fieldValue: "manualllySetPrice",
      options:[
        {
          fieldId: "currentPricing",
          label: "Use current store pricing",
          value: "currentPricing",
          group: 'itemPrice'
        },
        {
          fieldId: "manualllySetPrice",
          label: "Manually set the price for this item",
          value: "manualllySetPrice",
          group: 'itemPrice'
        }
      ],
    },
    {
      fieldId: "manualPrice",
      label: "Manual Price",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "quantity",
      label: "Quantity",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    }
  ]

  addProdTableConfig: GridModel = {
    EnableSearch: false,
    enablePagination:false,
    tableHeader: 'Images',
    columns: [] = [
      {
        name: 'Image',
        type: 'image',
        id: 'image_url'
      },
      {
        name: 'Description',
        type: 'string',
        id: 'discrp',
      },
      {
        name: 'Qty',
        type: 'input',
        id: 'qty',
      },
      {
        name: 'Item Price',
        type: 'input',
        id: 'itemPrice',
      },
      {
        name: 'Item Total',
        type: 'string',
        id: 'itemTotal',
      },
      {
        name: '',
        type: 'action',
        id: 'action',
      },
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreatedDate',
    sortOrder: 1
  };
  popupSearchFlds:any[] = [
    {
      fieldId: "searchProduct",
      label: "Search By Product Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
  ]

  matchedCustomers: any = [];
  CustomerSearchResult: any;
  matchedCustomersList: any = {//3
    fieldId: "customerList",
    label: "Matched Customer",
    fieldValue: "",
    type: "select",
    isValid: true,
    errorMesg: "",
    required: false,
    options: this.matchedCustomers
  };
 
  constructor(private http:HttpUtilityService, private helper: HelperService,private modalService: NgbModal, ) { }

  ngOnInit(): void {
  }

  CreateClicked(){
    if(this.helper.isFormValid(this.customerInfoFields)){

    }
  }

  customerSelectionChanged(customer) {
    var details = JSON.parse(customer);
    this.CustomerEmail = details.cusEmail;
    this.selectedCustomer = details;
    this.helper.MapDataToModel(this.customerInfoFields, this.selectedCustomer);
  }

  CancelClicked() {
  }

  BackClicked(){
    this.selectedIndex -= 1;
  }

  nextStep() {
    if(this.selectedIndex == 0 && this.helper.isFormValid(this.customerInfoFields)){
      this.selectedIndex = 1;
    }else if(this.selectedIndex == 1 && this.helper.isFormValid(this.itemFields)){
      this.selectedIndex = 2;
    }else if(this.selectedIndex == 2 && this.helper.isFormValid(this.shippingFields)){
      this.selectedIndex = 3;
    }else if(this.selectedIndex == 3 && this.helper.isFormValid(this.finalizeFields)){
    }
  }

  onAnyAction(data) {
    console.log(data);
  }

  saveOrder() {

  }

  custProductModel(addCustProd:any){
    this.modalService.open(addCustProd, { size: 'md', backdrop: 'static', centered: true });
  }

  closeModel() {
    this.modalService.dismissAll();
  }

  searchProdModel(searchProd:any){
    this.modalService.open(searchProd, { size: 'md', backdrop: 'static', centered: true });
  }

  SearchCustomer(val: string) {
    if (val) {
      this.http.get(AppconstantsService.CustomerApis.GetMatchingCustomer+"/"+val).then((data) => {
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            this.matchedCustomers.push({ value: JSON.stringify(data[i]), label: data[i].custName })
          }
        }
        else {
          this.helper.showErrorTostMessage("No matching result found")
        }
      }, (e) => {

      })
    }
  }

}
