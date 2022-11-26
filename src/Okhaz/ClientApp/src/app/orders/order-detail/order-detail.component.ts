import { Component, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/widget-component/pop-up/confirm-dialog/confirm-dialog.component';

import { GridModel } from '../../models/grid.model';
import { AppconstantsService } from '../../service/core/appconstants.service';
import { HttpUtilityService } from '../../service/core/httputility.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ReportComponent } from 'app/widget-component/pop-up/report/report.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  row: any;
  statusList = [];
  deliveryManList = [];
  transactionsList = [];
  orderStatusList = [];
  step = 0;
  orderNumber: any = "";
  selectedOrderStatus: any;
  selectedDeliveryMan: any;
  orderFields: any[] = [
    {
      fieldId: "status",
      label: "Status",
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
    }
  ];
  displayedColumns: string[] = ['id', 'message', 'dateCreated'];
  sampleData: any[] = [
    {
      user: {
        displayName: "Steven Gonzalez",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: true
      },
      id: 1,
      displayName: "BarCode : 123456789",
      image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      reference: '70d4d7d0',
      uom: 'PCS',
      price: '10.24',
      total: '1',
      qty: 5,
      orderNumber: "40",
      deviceUsed: "Android",
      status: {
        status: 'Processing',
        statusIcon: './assets/img/orderStatus/processing.png',
        type: 'Platinum'
      },
      accountType: 'Credit Card',
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    },
    {
      user: {
        displayName: "Josephine Goodman",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: true
      },
      id: 2,
      displayName: "BarCode : 123456789",
      image: "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
      reference: '70d4d7d0',
      uom: 'KG',
      price: '24.62',
      total: '1',
      qty: 5,
      orderNumber: "50",
      deviceUsed: "Android",
      status: {
        status: 'Awaiting Payment',
        statusIcon: './assets/img/orderStatus/ready-pickup.png',
        type: 'Gold'
      },
      accountType: 'Credit Card',
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    },
    {
      user: {
        displayName: "Mario Harmon",
        id: "0565898186",
        city: "New York",
        country: "USA",
        email: "abcd@abcd.com",
        address: "E-112, Austin Street, New York, USA",
        isNew: false
      },
      id: 3,
      displayName: "BarCode : 123456789",
      image: "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
      reference: '70d4d7d0',
      uom: 'KG',
      price: '49.29',
      total: '1',
      qty: 5,
      orderNumber: "60",
      deviceUsed: "Android",
      status: {
        status: 'Order In Progress',
        statusIcon: './assets/img/orderStatus/ordered.png',
        type: 'Silver'
      },
      accountType: 'Credit Card',
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    }
  ];

  OrderDetailsConfig: GridModel = {
    EnableSearch: true,
    tableHeader: 'Order',
    enablePagination: true,
    columns: [] = [
      {
        name: 'ID',
        type: 'string',
        id: 'id'
      },
      {
        name: 'Image',
        type: 'image',
        id: 'image',
        sortable: true
      },
      {
        name: 'Name',
        type: 'string',
        id: 'displayName'
      },
      {
        name: 'Supplier Name',
        type: 'string',
        id: 'supplierName',
        sortable: true
      },
      {
        name: 'Sub Order#',
        type: 'string',
        id: 'subOrderNumber',
        sortable: true
      },
      {
        name: 'UOM',
        type: 'string',
        id: 'uom',
        sortable: true
      },
      {
        name: 'Quantity',
        type: 'string',
        id: 'qty',
        sortable: true
      },
      {
        name: 'Price',
        type: 'string',
        id: 'price',
        sortable: true
      },
      {
        name: 'Total',
        type: 'string',
        id: 'total',
        sortable: true
      },
      {
        name: 'Status',
        type: 'orderStatus',
        id: 'status',
        sortable: true,
        displayColor: true,
        displayColorId: 'statusColor',
        options: AppconstantsService.orderStatus
      },
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };

  constructor(public http: HttpUtilityService, private route: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log(this.http.detailPageData);
    let gridModel = {
      start: 0,
      limit: this.OrderDetailsConfig.currentPageSize,
      sortCol: this.OrderDetailsConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    if (this.http.detailPageData) {
      this.row = this.http.detailPageData;
      this.getDatFromServer(this.row.orderNumber, gridModel);
      this.getOrderStatusList(this.row.status.id);
      this.getDeliveryManList(this.row.deliveryMan);
      this.getOrderTransactionList(this.row.orderNumber);
    }
    else {
      this.route.navigate(["/orders/view"]);
    }
  }

  generatePDF(action = 'open', type: string, data: any) {
    if (!Array.isArray(data)) {
      alert("No data to generate report")
      return;
    }
    let docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          text: 'Order Sales Report By ' + type,
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        }, {
          columns: [
            [
              {
                text: this.row?.user?.displayName,
                bold: true
              },
              { text: this.row?.user?.addres },
              { text: this.row?.user?.email }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        }, {
          text: 'Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Order#', 'Order date', 'Customer Name', 'Mobile', 'Payment Type', 'Total', 'Discount', 'Shipping', 'Tax', 'Grand Total'],
              ...data.map(p => ([p.OrderID, p.OrderDate, p.CustomerName, p.Mobile, p.PaymentType, p.Total, p.discount, p.shipping, p.tax, p.grandTotal?p.grandTotal:''])),
            ]
          }
        },
        {
          columns: [
            // [{ qr: `${this.row?.user?.displayName}`, fit: '50' }],  
            [{ text: 'Signature', alignment: 'right', italics: true,  }]
          ],
          margin: [0, 15, 0, 15]
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }

  }

  getOrderTransactionList(orderNumber: any) {
    this.http.get(AppconstantsService.OrderAPIS.GetOrderTransactionList + orderNumber).then((data: any) => {
      if (data.length > 0) {
        this.transactionsList = data;
      }
    });
  }

  openOrderStatusChangeConfirmDialog(): void {
    if (!this.selectedOrderStatus) {
      return;
    }
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to change the order status to ' + this.selectedOrderStatus.label + ' ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'confirm') {
        var orderStatusChangeObject = {
          orderId: this.row.orderNumber,
          orderStatusId: this.selectedOrderStatus.value
        }
        this.http.post(AppconstantsService.OrderAPIS.UpdateOrderStatus + this.row.orderNumber + "/" + this.selectedOrderStatus.value, orderStatusChangeObject).then((data: any) => {
          console.log(data);
        });
      }
    });
  }

  openDeliveryManChangeConfirmDialog(): void {
    if (!this.selectedDeliveryMan) {
      return;
    }
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to change the delivery man to ' + this.selectedDeliveryMan.label + ' ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'confirm') {
        var deliverManChangeObject = {
          orderId: this.row.orderNumber,
          deliveryManId: this.selectedDeliveryMan.value
        }
        this.http.post(AppconstantsService.OrderAPIS.UpdateDeliveryMan + this.row.orderNumber + "/" + this.selectedDeliveryMan.value, deliverManChangeObject).then((data: any) => {
          console.log(data);
        });
      }
    });
  }

  openReportDialog(): void {
    let dialogRef = this.dialog.open(ReportComponent, {
      width: '400px',
      data: 'Report Generate'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'confirm') {
        this.http.get(result.api).then((data: any) => {
          console.log(data);
          this.generatePDF('open', result.type, data);
        });
      }
    });
  }

  getDeliveryManList(deliveryManId: any) {
    this.http.get(AppconstantsService.OrderAPIS.GetDeliveryManList).then((data: any) => {
      data.forEach((element: any) => {
        this.deliveryManList.push({ value: element.id, label: element.userName });
      });
      this.orderFields[1].options = this.deliveryManList;
      this.orderFields[1].fieldValue = deliveryManId;
    });
  }

  getOrderStatusList(orderStatusId: any) {
    this.http.get(AppconstantsService.OrderAPIS.GetOrderStatusList).then((data: any) => {
      data.forEach((element: any) => {
        this.orderStatusList.push({ value: element.OrderStatusID, label: element.OrderStatusName });
      });
      this.orderFields[0].options = this.orderStatusList;
      this.orderFields[0].fieldValue = orderStatusId;
    });
  }

  onOrderStatusChange(e: any) {
    var orderStatus = this.orderStatusList.filter(item => item.value === e)[0];
    this.selectedOrderStatus = orderStatus;
  }

  onDeliveryManChange(e: any) {
    var deliveryMan = this.deliveryManList.filter(item => item.value === e)[0];
    this.selectedDeliveryMan = deliveryMan;
  }

  setStep(index: number) {
    this.step = index;
  }

  setTableData(data: any, gridModel: any) {
    this.OrderDetailsConfig.data = data;
    this.OrderDetailsConfig.totalRows = data.length;
  }

  getDate(date: any) {
    if (!date) {
      return;
    }
    return date.split(" ")[0];
  }

  getDatFromServer(orderNumber, gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    this.http.get(AppconstantsService.OrderAPIS.GetOrderDetail + orderNumber).then((data: any) => {
      var updatedData = {
        rows: [],
        totalRows: 0
      };
      if (data) {
        updatedData.totalRows = data.length;
        for (var i = 0; i < data.length; i++) {
          var row = data[i];
          updatedData.rows.push({
            id: row.ItemId,
            image: row.image_url,
            displayName: row.itemName,
            supplierName: row.suppName,
            orderNumber: row.SubOrderNumber,
            uom: row.UOM_Name,
            qty: row.Quantity,
            price: row.Price,
            total: (row.Quantity * row.Price),
            status: {
              status: row.OrderItemStatus,
              statusIcon: this.getOrderStatsImage(row.OrderItemStatus),
              type: row.OrderItemStatus,
              fontColor: 'white',
              bgColor: 'blue'
            },
          });
        }
        this.setTableData(updatedData.rows, gridModel);
      }
    });
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

  getStatusColor(status) {
    switch (status) {
      case 0: return "#879193";
        break;
      case 1: return "#bddf57";
        break;
      case 2: return "#4a6fb3";
        break;
      case 3: return "#fccb05";
        break;
      case 4: return "#000";
        break;
      case 5: return "#7f5f3c";
        break;
      case 6: return "#ff9000";
        break;
      case 7: return "#bddf57";
        break;
      case 8: return "#cd3101";
        break;
      case 9: return "#fccb05";
        break;
      case 10: return "#72cdfa";
        break;
      case 11: return "#e7a0ae";
        break;
      case 12: return "#96f";
        break;
      case 13: return "#fccb05";
        break;
    }
  }

  ngOnDestroy() {
    location.reload();
    this.http.detailPageData = null;
  }

}
