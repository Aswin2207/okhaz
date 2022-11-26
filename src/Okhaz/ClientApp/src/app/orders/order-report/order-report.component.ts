import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppconstantsService } from 'app/service/core/appconstants.service';
import { HttpUtilityService } from 'app/service/core/httputility.service';

@Component({
  selector: 'ms-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss'],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})

//Log the date to our web console.
export class OrderReportComponent implements OnInit {
  reportType = [{
    value: 1,
    label: 'Branch',
    api: AppconstantsService.reportsAPI.OnlineSalesReportByBranch
  },
  {
    value: 2,
    label: 'Supplier',
    api: AppconstantsService.reportsAPI.OnlineSalesReportBySuppID
  },
  {
    value: 3,
    label: 'Delivery Man',
    api: AppconstantsService.reportsAPI.OnlineSalesReportByDeliverManID
  },
  {
    value: 4,
    label: 'Customer Sale',
    api: AppconstantsService.reportsAPI.OnlineSalesReportByCustomerSale
  },
  {
    value: 5,
    label: 'Product Count',
    api: AppconstantsService.reportsAPI.OnlineSalesReportByProductCount
  }];
  selectedReportType = 1;
  fromDate = this.getOneWeekAgo();
  toDate = new Date();
  todayDate = new Date();
  supplierID = '';
  deliveryManId = '';
  deliveryManList = [];
  supplierList = [];
  reportList = [];
  reportColumns = [];

  displayedColumns: string[] = [];

  skipFields: string[] = ['Mobile', 'email'];
  displaySkipFields: string[] = ['Mobile', 'email', 'CustomerName', 'OrderStatus', 'OrderDate'];
  amountFields: string[] = ['tax', 'shipping', 'Total', 'discount', 'grandtotal', 'Revenue'];
  columnsHead = {
    OrderID: 'Order#',
    CustomerName: 'User',
    grandtotal: 'Grand Total',
    OrderDate: 'Date Created',
    PaymentType: 'Account Type',
    OrderStatus: 'Status',
    DeviceName: 'Device Used',
    DeliveryMan: 'Delivery Man',
    CustId: "Customer#",
    LastOrderID: "Last Order#",
    LastOrderDate: "Last Order Date",
    ItemId: "Product#",
    Item_Name: "Product Name",
    Supplier_ID: "Supplier#",
    Supplier_Name: "Supplier Name",
    Total_Quantity: "Total Quantity"
  };

  reportFields: any[] = [
    {
      fieldId: "status",
      label: "Suppliers",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "delivery",
      label: "Delivery Men",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "reportBy",
      label: "Order Sales Report By",
      fieldValue: this.reportType[0].value,
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: this.reportType
    },
  ];

  constructor(public dialogRef: MatDialogRef<OrderReportComponent>, public http: HttpUtilityService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.getDeliveryManList();
    this.getSupplierList();
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

  onConfirm(): void {
    console.log('fromDate:', this.formatDate(this.fromDate));
    console.log('toDate:', this.formatDate(this.toDate));
    var reportType: any = this.reportType.filter(item => item.value === this.selectedReportType)[0];
    //reportType.api = reportType.api.replace('{FromDate}', this.fromDate);
    //reportType.api = reportType.api.replace('{ToDate}', this.toDate);
    var apiLink = reportType.api.replace('{FromDate}', this.formatDate(this.fromDate));
    apiLink = apiLink.replace('{ToDate}', this.formatDate(this.toDate));
    if (reportType.value == 2) {
      apiLink = apiLink.replace('{SupplierID}', this.supplierID);
    }
    if (reportType.value == 3) {
      apiLink = apiLink.replace('{DeliveryManID}', this.deliveryManId);
    }

    console.log('apiLink:', apiLink);
    this.getDataList({ action: 'confirm', api: apiLink, type: reportType.label });
    //this.dialogRef.close({ action: 'confirm', api: reportType.api, type: reportType.label });
  }

  getOrderStatsImage(status): string {
    var statusImage = './assets/img/orderStatus/ordered.png';
    if (status == 2) {
      statusImage = './assets/img/orderStatus/pending.png'
    } else if (status == 9) {
      statusImage = './assets/img/orderStatus/cancelled.png'
    } else if (status == 11) {
      statusImage = './assets/img/orderStatus/processing.png'
    } else if (status == 4) {
      statusImage = './assets/img/orderStatus/ready-pickup.png'
    } else if (status == 10) {
      statusImage = './assets/img/orderStatus/rejected.png'
    }
    return statusImage;
  }

  getOneWeekAgo() {
    var ourDate = new Date();
    var pastDate = ourDate.getDate() - 7;
    ourDate.setDate(pastDate);
    return ourDate;
  }

  getDataList(inputData: any) {
    this.reportList = [];
    this.reportColumns = [];
    this.displayedColumns = ["OrderID"];
    var i = 0;
    this.http.get(inputData.api).then((data: any) => {
      console.log('datalenth:', data.length);
      if (typeof data.length != "undefined") {
        data.forEach((element: any) => {
          if (i == 0) {
            Object.keys(element).forEach((col: any) => {
              this.reportColumns.push({ key: col })
              //this.displayedColumns.push(col);
            });
          }

          this.reportList.push(element);
          i++;
        });
      }
      console.log('i:', this.reportColumns);
      //this.reportFields[1].options = this.deliveryManList;
    });
  }

  formatAmount(str) {
    return this.countDecimals(str) > 3 ? parseFloat(str).toFixed(3) : str;
  }

  countDecimals = function (x) {
    if (Math.floor(x.valueOf()) === x.valueOf()) return 0;
    var t = x.toString().split(".");
    return t.length == 1 ? 0 : t[1].length;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  formatDate2(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  }
  getDeliveryManList() {
    this.http.get(AppconstantsService.OrderAPIS.GetDeliveryManList).then((data: any) => {
      data.forEach((element: any) => {
        this.deliveryManList.push({ value: element.id, label: element.userName });
      });
      this.reportFields[1].options = this.deliveryManList;
      
    });

  }

  getSupplierList() {
    this.http.get(AppconstantsService.UsersAPIS.GetSupplierDetailsbybranchCode).then((data: any) => {
      data.forEach((element: any) => {
        this.supplierList.push({ value: element.suppID, label: element.suppName });
      });
      this.reportFields[0].options = this.supplierList;
    });
  }

  onSupplierChange(e: any) {
    var supplier = this.supplierList.filter(item => item.value === e)[0];
    this.supplierID = supplier.value;
  }

  onDeliveryManChange(e: any) {
    var deliveryMan = this.deliveryManList.filter(item => item.value === e)[0];
    this.deliveryManId = deliveryMan.value;
  }

  onReportTypeChange(e: any) {
    var reportType = this.reportType.filter(item => item.value === e)[0];
    this.selectedReportType = reportType.value;
  }


}
