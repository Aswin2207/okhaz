import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { GridModel } from "../../../models/grid.model";
import { AppconstantsService } from "../../../service/core/appconstants.service";
import { HelperService } from "../../../service/core/helper.service";
import { HttpUtilityService } from "../../../service/core/httputility.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-supplier-detail",
  templateUrl: "./supplier-detail.component.html",
  styleUrls: ["./supplier-detail.component.scss"],
})
export class SupplierDetailComponent implements OnInit, OnDestroy {
  step = 0;
  row: any;
  expiryCount: number = 150;
  expiryDate: Date = new Date();
  minDate: Date = new Date();
  currency: string = "AED";
  progress: any[] = [
    {
      icon: "BTC-alt",
      name: "New Order",
      trade: "30",
      progressValue: "30",
      values: "100",
      card_color: "primary-bg",
    },
    {
      icon: "ETC",
      name: "Accepted Order",
      trade: "60",
      progressValue: "60",
      values: "120",
      card_color: "success-bg",
    },
    {
      icon: "LTC-alt",
      name: "On the Way",
      trade: "80",
      progressValue: "80",
      values: "13",
      card_color: "accent-bg",
    },
    {
      icon: "ZEC-alt",
      name: "Cancelled",
      trade: "40",
      progressValue: "40",
      values: "1",
      card_color: "warn-bg",
    },
  ];
  uploadTable: any = [];
  sampleData: any[] = [
    {
      user: {
        displayName: "Steven Gonzalez",
        image:
          "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: true,
      },
      id: 1,
      displayName: "BarCode : 123456789",
      image:
        "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      reference: "70d4d7d0",
      uom: "PCS",
      price: "10.24",
      total: "1",
      qty: 5,
      orderNumber: "40",
      deviceUsed: "Android",
      status: {
        status: "Processing",
        statusIcon: "./assets/img/orderStatus/processing.png",
        type: "Platinum",
      },
      accountType: "Credit Card",
      from: "2018/04/25 02:07:59",
      to: "2018/04/25 02:07:59",
      isHover: false,
    },
    {
      user: {
        displayName: "Josephine Goodman",
        image:
          "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: true,
      },
      id: 2,
      displayName: "BarCode : 123456789",
      image:
        "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
      reference: "70d4d7d0",
      uom: "KG",
      price: "24.62",
      total: "1",
      qty: 5,
      orderNumber: "50",
      deviceUsed: "Android",
      status: {
        status: "Awaiting Payment",
        statusIcon: "./assets/img/orderStatus/ready-pickup.png",
        type: "Gold",
      },
      accountType: "Credit Card",
      from: "2018/04/25 02:07:59",
      to: "2018/04/25 02:07:59",
      isHover: false,
    },
    {
      user: {
        displayName: "Mario Harmon",
        image:
          "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: false,
      },
      id: 3,
      displayName: "BarCode : 123456789",
      image: "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
      reference: "70d4d7d0",
      uom: "KG",
      price: "49.29",
      total: "1",
      qty: 5,
      orderNumber: "60",
      deviceUsed: "Android",
      status: {
        status: "Order In Progress",
        statusIcon: "./assets/img/orderStatus/ordered.png",
        type: "Silver",
      },
      accountType: "Credit Card",
      from: "2018/04/25 02:07:59",
      to: "2018/04/25 02:07:59",
      isHover: false,
    },
  ];

  OrderDetailsConfig: GridModel = {
    EnableSearch: false,
    tableHeader: "Suppliers",
    enablePagination: true,
    columns: ([] = [
      {
        name: "User",
        type: "user",
        id: "user",
        sortable: true,
      },
      {
        name: "Reference",
        type: "string",
        id: "reference",
      },
      {
        name: "Total",
        type: "string",
        id: "total",
        sortable: true,
      },
      {
        name: "Qty",
        type: "string",
        id: "qty",
        sortable: true,
      },
      {
        name: "Status",
        type: "orderStatus",
        id: "status",
        sortable: true,
      },
    ]),
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: "CreateAt",
    sortOrder: 1,
  };

  SubscriptionDetailsConfig: GridModel = {
    EnableSearch: false,
    tableHeader: "Suppliers",
    enablePagination: true,
    columns: ([] = [
      {
        name: "Checkbox",
        type: "checkbox",
        id: "checkbox",
      },
      {
        name: "Subscription Plan",
        type: "user",
        id: "plan",
        sortable: true,
      },
      {
        name: "Subscription Date",
        type: "string",
        id: "SubscriptionDate",
        sortable: true,
      },
      {
        name: "Expiry Date",
        type: "string",
        id: "ExpiryDate",
        sortable: true,
      },
      {
        name: "Status",
        type: "orderStatus",
        id: "SubStatus",
        sortable: true,
        displayColor: true,
        displayColorId: "statusColor",
        options: AppconstantsService.orderStatus,
      },
      {
        name: "Action",
        type: "orderAction",
        id: "replyAction",
      },
    ]),
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: "CreateDate",
    sortOrder: 1,
  };

  FileUploadConfig: GridModel = {
    EnableSearch: false,
    tableHeader: "Suppliers",
    enablePagination: true,
    columns: ([] = [
      {
        name: "Checkbox",
        type: "checkbox",
        id: "checkbox",
      },
      {
        name: "File",
        type: "user",
        id: "user",
        sortable: true,
      },
      {
        name: "Document Number",
        type: "string",
        id: "reference",
        sortable: true,
      },
      {
        name: "Document Type",
        type: "string",
        id: "accountType",
        sortable: true,
      },
      {
        name: "Status",
        type: "orderStatus",
        id: "status",
        sortable: true,
        displayColor: true,
        displayColorId: "statusColor",
        options: AppconstantsService.orderStatus,
      },
      {
        name: "Action",
        type: "orderAction",
        id: "action",
      },
    ]),
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: "CreateAt",
    sortOrder: 1,
  };
  uploadDetails = [
    {
      fieldId: "documentNumber",
      label: "Document Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide document number",
      required: true,
    },
    {
      fieldId: "documentType",
      label: "Document Type *",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "Please provide document type",
      required: true,
      options: [
        { value: "Passport", label: "Passport" },
        { value: "Digital", label: "Digital" },
      ],
    },
    {
      fieldId: "document",
      label: "Document",
      fieldValue: null,
      type: "file",
      isValid: true,
      errorMesg: "Please provide document",
      required: true,
    },
  ];
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;
  supplierStatus = false;

  constructor(
    private helper: HelperService,
    private modalService: NgbModal,
    public http: HttpUtilityService,
    private route: Router
  ) {
    let gridModel = {
      start: 0,
      limit: this.OrderDetailsConfig.currentPageSize,
      sortCol: this.OrderDetailsConfig.sortCol,
      sortOrder: 1,
      searchVal: "",
    };

    var data = this.helper.getDataFromStorageDetails("BranchInfo");
    if (data) {
      data = JSON.parse(data);
      console.log("brachInfo:", data);
      this.currency = data.BranchInfo.Currency;
    }

    this.getDatFromServer(gridModel);
  }

  ngOnInit(): void {
    if (this.http.detailPageData) this.row = this.http.detailPageData;
    else this.route.navigate(["/user/supplier"]);
  }

  setStep(index: number) {
    this.step = index;
  }

  setTableData(data: any, gridModel: any) {
    console.log(data);
    this.OrderDetailsConfig.data = data.rows;
    this.OrderDetailsConfig.totalRows = data.totalRows;
    this.FileUploadConfig.data = this.uploadTable;
    this.FileUploadConfig.totalRows = this.uploadTable.length;
  }

  setSubscriptionData(data: any, gridModel: any) {
    console.log(data);
    this.SubscriptionDetailsConfig.data = data.rows;
    this.SubscriptionDetailsConfig.totalRows = data.totalRows;
  }

  getDatFromServer(gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    this.FileUploadConfig.currentPageSize = gridModel.limit;
    this.SubscriptionDetailsConfig.currentPageSize = gridModel.limit;
    // this.setTableData(this.sampleData, gridModel);
    var updatedData = {
      rows: [],
      totalRows: 0,
    };
    var subscriptionData = {
      rows: [],
      totalRows: 0,
    };
    if (this.http.detailPageData) {
      this.http
        .get(
          AppconstantsService.UsersAPIS.GetSupplierDetails +
            this.http.detailPageData.user.id
        )
        .then((data: any) => {
          this.row = data[0];
          this.supplierStatus = this.row.suppStatus == "Active";
          this.http
            .get(
              AppconstantsService.UsersAPIS.SupplierOrderWidget +
                this.row.suppID
            )
            .then((widgetData: any) => {
              this.progress = [
                {
                  icon: "BTC-alt",
                  name: "New Order",
                  trade: widgetData[0] ? widgetData[0].OrderPlaced : 0,
                  progressValue: "30",
                  values: widgetData[0] ? widgetData[0].OrderPlaced : 0,
                  type: "add",
                  card_color: "primary-bg",
                },
                {
                  icon: "ETC",
                  name: "Accepted Order",
                  trade: widgetData[0] ? widgetData[0].Accepted : 0,
                  progressValue: "60",
                  values: widgetData[0] ? widgetData[0].Accepted : 0,
                  type: "view",
                  card_color: "success-bg",
                },
                {
                  icon: "LTC-alt",
                  name: "On the Way",
                  trade: widgetData[0] ? widgetData[0].OrderOnTheWay : 0,
                  progressValue: "80",
                  values: widgetData[0] ? widgetData[0].OrderOnTheWay : 0,
                  type: "view",
                  card_color: "accent-bg",
                },
                {
                  icon: "ZEC-alt",
                  name: "Cancelled",
                  trade: widgetData[0] ? widgetData[0].Cancelled : 0,
                  progressValue: "40",
                  values: widgetData[0] ? widgetData[0].Cancelled : 0,
                  type: "view",
                  card_color: "warn-bg",
                },
              ];
              console.log(this.row);
            });
          this.http
            .get(
              AppconstantsService.UsersAPIS.GetOrderDetailsbySupllierID +
                this.row.suppID
            )
            .then((data: any) => {
              if (data) {
                updatedData.totalRows = data.length;
                for (var i = 0; i < data.length; i++) {
                  var row = data[i];
                  updatedData.rows.push({
                    user: {
                      displayName:
                        (row.FirstName ? row.FirstName : "") +
                        " " +
                        (row.MiddleName ? row.MiddleName : ""),
                      image: "./assets/img/default_avatar.png",
                      id: row.Mobile ? row.Mobile : "",
                      city: row.City ? row.City : "",
                      country: row.country,
                      email: row.email,
                      address: row.AddressLine1 + ", " + row.AddressLine2,
                      isNew: row.OrderStatus == 1,
                    },
                    reference: row.OrderRef,
                    total: row.Total,
                    qty: row.TotalQuandity,
                    orderNumber: row.OrderID,
                    deviceUsed: row.DeviceName,
                    deliveryMan: row.DeliveryMan,
                    subTotal: row.SubTotal,
                    itemDiscount: row.ItemDiscount,
                    tax: row.tax,
                    shipping: row.shipping,
                    promo: row.Promo,
                    discount: row.discount,
                    grandtotal: row.grandtotal,
                    status: {
                      id: row.OrderStatus,
                      statusIcon: this.getOrderStatsImage(row.OrderStatus),
                      type: row.OrderStatusName,
                      fontColor: "white",
                      bgColor: "blue",
                    },
                    accountType: row.OrderTransactionType,
                    dateCreated: row.CreateAt,
                    isHover: false,
                  });
                }
                this.setTableData(updatedData, gridModel);
              }
            });
          this.http
            .get(
              AppconstantsService.UsersAPIS.GetSubscriptionDetailsbySupllierID +
                this.row.suppID
            )
            .then((data: any) => {
              if (data) {
                subscriptionData.totalRows = data.length;
                for (var i = 0; i < data.length; i++) {
                  var row = data[i];
                  subscriptionData.rows.push({
                    user: {
                      displayName: row.Subscription_Name,
                      image: "./assets/img/default_avatar.png",
                      id: row.Mobile ? row.Mobile : "",
                      city: row.City ? row.City : "",
                      country: row.country,
                      email: row.email,
                      address: row.AddressLine1 + ", " + row.AddressLine2,
                      isNew: row.OrderStatus == 1,
                    },
                    Subscription_Name: row.Subscription_Name,
                    SubscriptionFee: row.SubscriptionFee,
                    SubscriptionDate: row.SubscriptionDate,
                    ExpiryDate: row.ExpiryDate,
                    SubStatus: row.SubStatus,
                    deliveryMan: row.DeliveryMan,
                    subTotal: row.SubTotal,
                    itemDiscount: row.ItemDiscount,
                    tax: row.tax,
                    shipping: row.shipping,
                    promo: row.Promo,
                    discount: row.discount,
                    grandtotal: row.grandtotal,
                    status: {
                      id: row.SubStatus,
                      statusIcon: this.getOrderStatsImage(row.SubStatus),
                      type: row.OrderStatusName,
                      fontColor: "white",
                      bgColor: "blue",
                    },
                    dateCreated: row.CreateDate,
                    isHover: false,
                  });
                }
                this.setSubscriptionData(subscriptionData, gridModel);
              }
            });
        });
    }
  }

  getOrderStatsImage(status): string {
    var statusImage = "./assets/img/orderStatus/ordered.png";
    if (status == 2) {
      statusImage = "./assets/img/orderStatus/pending.png";
    } else if (status == 9) {
      statusImage = "./assets/img/orderStatus/cancelled.png";
    } else if (status == 11) {
      statusImage = "./assets/img/orderStatus/processing.png";
    } else if (status == 4) {
      statusImage = "./assets/img/orderStatus/ready-pickup.png";
    } else if (status == 10) {
      statusImage = "./assets/img/orderStatus/rejected.png";
    }
    return statusImage;
  }

  supplierStatusChanged() {
    this.row.suppStatus = this.supplierStatus ? "Active" : "Inactive";
    this.http
      .post(
        AppconstantsService.UsersAPIS.UpdateSupplierStatus +
          this.row.suppID +
          "/" +
          this.row.suppStatus,
        {}
      )
      .then((data: any) => {});
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  openModel(model: any) {
    this.modalService.open(model, {
      size: "md",
      backdrop: "static",
      centered: true,
    });
  }

  closeModel() {
    this.modalService.dismissAll();
  }

  calc() {
    // To calculate the time difference of two dates
    this.expiryCount = this.expiryDate.getTime() - this.minDate.getTime();
    // To calculate the no. of days between two dates
    this.expiryCount = Math.round(this.expiryCount / (1000 * 3600 * 24));
    this.closeModel();
  }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.readBase64(file).then((data) => {
      this.uploadDetails[2].fieldValue = data;
    });
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.uploadDetails)) {
      let uploadInfo = {
        user: {
          displayName: this.uploader.queue[0].file?.name,
          image: this.uploadDetails[2].fieldValue,
          city: "New York",
          country: "USA",
          email: "abcd@abcd.com",
          address: "E-112, Austin Street, New York, USA",
          isNew: true,
        },
        id: this.uploadTable.length
          ? parseInt(this.uploadTable[this.uploadTable.length - 1].id) + 1
          : 1,
        reference: this.uploadDetails[0].fieldValue,
        uom: "PCS",
        price: "10.24",
        total: "1",
        qty: 5,
        orderNumber: "40",
        deviceUsed: "Android",
        status: {
          status: "Order In Progress",
          statusIcon: "./assets/img/orderStatus/ordered.png",
          type: "Silver",
        },
        accountType: this.uploadDetails[1].fieldValue,
        dateCreated: "2018/04/25 02:07:59",
        isHover: false,
      };
      this.uploadTable.push(uploadInfo);
      this.clear();
    } else {
      this.helper.showErrorTostMessage("Please fill all mandatory data.");
    }
  }

  clear() {
    this.uploader = new FileUploader({
      allowedFileType: ["image"],
    });
    this.uploadDetails.map((x) => (x.fieldValue = null));
  }

  readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener(
        "load",
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.addEventListener(
        "error",
        function (event) {
          reject(event);
        },
        false
      );

      reader.readAsDataURL(file);
    });
    return future;
  }

  getStatusColor(status) {
    switch (status) {
      case 0:
        return "#879193";
        break;
      case 1:
        return "#bddf57";
        break;
      case 2:
        return "#4a6fb3";
        break;
      case 3:
        return "#fccb05";
        break;
      case 4:
        return "#000";
        break;
      case 5:
        return "#7f5f3c";
        break;
      case 6:
        return "#ff9000";
        break;
      case 7:
        return "#bddf57";
        break;
      case 8:
        return "#cd3101";
        break;
      case 9:
        return "#fccb05";
        break;
      case 10:
        return "#72cdfa";
        break;
      case 11:
        return "#e7a0ae";
        break;
      case 12:
        return "#96f";
        break;
      case 13:
        return "#fccb05";
        break;
    }
  }
  navigate(type) {
    if (typeof type == "undefined") type = "view";
    this.route.navigate(["/orders/" + type]);
  }

  ngOnDestroy() {
    this.http.detailPageData = null;
  }
}
