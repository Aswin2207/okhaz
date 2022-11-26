import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GridModel } from '../../models/grid.model';
import { Input } from '../../models/input.model';
import { AppconstantsService } from '../../service/core/appconstants.service';
import { HttpUtilityService } from '../../service/core/httputility.service';
import { HelperService } from '../../service/core/helper.service';

@Component({
  selector: 'app-couponcode',
  templateUrl: './couponcode.component.html',
  styleUrls: ['./couponcode.component.scss']
})
export class CouponcodeComponent implements OnInit {

  @ViewChild('fileToUpload') fileUploaded?: ElementRef<HTMLElement>;
  File: any;
  ShowAddCoupon: boolean = true;
  constructor(private http: HttpUtilityService, private helper: HelperService, private httpc: HttpClient) {

    let gridModel = {
      start: 0,
      limit: this.CouponsList.currentPageSize,
      sortCol: 'itemName',
      sortOrder: 1,
      searchVal: ''
    }
    this.getCouponList(gridModel);
  }

  ngOnInit(): void {
  }

  CouponsList: GridModel = {
    EnableSearch: true,
    enablePagination: true,
    tableHeader: 'Coupon Code',
    columns: [] = [
      {
        name: '',
        type: 'image',
        id: 'ImagePath'
      },
      {
        name: 'Coupon Name',
        type: 'string',
        id: 'CMName'
      },
      {
        name: 'Coupon Code',
        type: 'string',
        id: 'CMCode'
      },
      {
        name: 'Discount',
        type: 'string',
        id: 'DiscountValue'
      },
      {
        name: 'Expiry Date',
        type: 'string',
        id: 'EndDate'
      },
      {
        name: 'No. Uses',
        type: 'string',
        id: 'LimitExisitingUserUses'
      },
      {
        name: 'Enabled',
        type: 'string',
        id: 'VStatus'
      },
      {
        name: '',
        type: 'action',
        id: 'action',
      },
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1
  }
  imagePath: any = "./assets/img/noImg_placeholder.jpeg";
  productDetails: Input[] = [
    {//0
      fieldId: "CMCode",
      label: "Coupon Code",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide coupon code",
      required: true
    },
    {//1
      fieldId: "CMName",
      label: "Coupon Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide coupon name",
      required: true
    },
  
    {//2
      fieldId: "DiscountType",
      label: "Discount Type",
      fieldValue: 'Dollar amount off the order total',
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      options: [
        {
          value: 'Dollar amount off the order total',
          label: "Dollar amount off the order total"
        },
        {
          value: 'Dollar amount off each item in the order',
          label: "Dollar amount off each item in the order"
        },
        {
          value: 'Percentage off each item in the order',
          label: "Percentage off each item in the order"
        },
        {
          value: 'Dollar amount off the shipping total',
          label: "Dollar amount off the shipping total"
        },
        {
          value: 'Free SHipping',
          label: "Free SHipping"
        },
      ]
    },
    {//3
      fieldId: "DiscountValue",
      label: "Discount Amount",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide discount amount",
      required: true
    },
    {//4
      fieldId: "MinimumPurchaseAmount",
      label: "Minimum Purchase",
      fieldValue: "",
      type: "number",
      isValid: true,
      errorMesg: "Please provide minimum purchase",
      required: true
    },
    {//5
      fieldId: "LimitExisitingUserUses",
      label: "Limit Exisiting User Uses",
      fieldValue: "",
      type: "number",
      isValid: true,
      errorMesg: "Please provide minimum purchase",
      required: true
    },
    {//6
      fieldId: "LimitNumberOfUses",
      label: "Limit total number of uses",
      fieldValue: false,
      type: 'number',
      isValid: true,
      errorMesg: "Please provide minimum purchase",
      required: false
    },
    {//7
      fieldId: "CMDescription",
      label: "Description",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide coupon description",
      required: true
    },
    {//8
      fieldId: "CartLevelDiscounts",
      label: "Exclude Cart Level Discounts",
      fieldValue: false,
      type: 'checkbox',
      isValid: true,
      errorMesg: "",
      required: false
    },
    {//9
      fieldId: "VStatus",
      label: "Enabled",
      fieldValue: false,
      type: 'checkbox',
      isValid: true,
      errorMesg: "",
      required: false
    },
    {//10
      fieldId: "EndDate",
      label: "Expiry Date",
      fieldValue: false,
      type: 'date',
      isValid: true,
      errorMesg: "",
      required: false
    },
    
  ];

  onAnyAction(d: any) {
    console.log(d);
  }

  deleteCouponClicked(d: any) {
    console.log(d);
  }

  addCouponClick(d: any) {
    this.ShowAddCoupon = true;
  }

  getDatFromServer(d: any) {
    console.log(d);
  }

  triggerFileClick(imageIndex: number) {
    if (this.fileUploaded) {
      let el: HTMLElement = this.fileUploaded.nativeElement;
      el.click();
    }
  }

  onFileUploaded(event: any) {
    var file = event.target.files;
    this.File = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        this.imagePath = fileReader.result.toString();
      }
    }
    fileReader.readAsDataURL(file[0]);
  }

  uploadFile(fileToUpload: File, fileName) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    this.httpc.post('api/upload/PostFormData/' + fileName, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {

      });
  }



  SaveCouponClicked() {
    if (this.helper.isFormValid(this.productDetails)) {
      var json: any = {};
      this.helper.getDataJsonMapped(this.productDetails, json);
      var coupon = json;
      var couponType = {
        DiscountType: json.DiscountType,
        DiscountValue: json.DiscountValue,
        CMDescription: json.CMDescription,
      };
      this.http.post(AppconstantsService.MarkettingAPIs.addCouponApi, json).then((data) => {
        this.ShowAddCoupon = false;
        this.helper.showSuccessTostMessage("Added coupon successfully");
        let gridModel = {
          start: 0,
          limit: this.CouponsList.currentPageSize,
          sortCol: 'itemName',
          sortOrder: 1,
          searchVal: ''
        }
        this.getCouponList(gridModel);

      });
    }
  }

  CancelAddCLicked() {
    this.ShowAddCoupon = false;
  }

  getCouponList(gridModel:any) {
    this.CouponsList.currentPageSize = gridModel.limit;
    this.http.post(AppconstantsService.MarkettingAPIs.getCouponAPI , gridModel).then((data) => {
      if (data) {
        console.log(data);
        this.CouponsList.data = data.rows;
        this.CouponsList.totalRows = data.totalRows;
      }
    }
      , (error) => { })
  }

}
