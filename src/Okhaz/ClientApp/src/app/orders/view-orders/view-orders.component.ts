import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpUtilityService } from 'app/service/core/httputility.service';
import { AppconstantsService } from 'app/service/core/appconstants.service';
import { GridModel } from 'app/models/GridModel';
import { MatTableDataSource } from '@angular/material/table';

export interface Order {
  user: any,
  reference:string,
  total:number,
  qty: number,
  orderNumber:number,
  deviceUsed: string,
  deliveryMan:string,
  subTotal:number,
  itemDiscount:number,
  tax: number,
  shipping: string,
  promo: string,
  discount: string,
  grandtotal:string,
  status: any,
  accountType: string,
  dateCreated: string,
  isHover: boolean
}

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewOrdersComponent implements OnInit {

  constructor(public http: HttpUtilityService, private route: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    let gridModel = {
      start: 0,
      limit: this.OrdersTableConfig.currentPageSize,
      sortCol: this.OrdersTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(gridModel);
  }

  filterIndex: number = 0;
  selectedOrderIndex = -1;
  currentOrder = {};

  OrdersTableConfig: GridModel = {
    EnableSearch: true,
    tableHeader: 'Order',
    enablePagination: true,
    columns: [] = [
      {
        name: 'Checkbox',
        type: 'checkbox',
        id: 'checkbox'
      },
      {
        name: 'User',
        type: 'user',
        id: 'user',
        sortable: true
      },
      {
        name: 'Order No#',
        type: 'string',
        id: 'orderNumber'
      },
      {
        name: 'Device Used',
        type: 'string',
        id: 'deviceUsed'
      },
      {
        name: 'Total',
        type: 'string',
        id: 'total',
        sortable: true
      },
      {
        name: 'Qty',
        type: 'string',
        id: 'qty',
        sortable: true
      },
      {
        name: 'Status',
        type: 'orderStatus',
        id: 'status',
        sortable: true,
      },
      {
        name: 'Account Type',
        type: 'string',
        id: 'accountType',
        sortable: true
      },
      {
        name: 'Order Date',
        type: 'date',
        id: 'dateCreated',
        sortable: true
      },
      {
        name: 'Action',
        type: 'orderAction',
        id: 'action'
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };
  isShowDateFilter = true;

  setTableData(data: any) {
    console.log(data);
    this.OrdersTableConfig.data = data.rows;
    this.OrdersTableConfig.totalRows = data.totalRows;
  }

  getDatFromServer(gridModel: any) {
    this.OrdersTableConfig.currentPageSize = gridModel.limit;
    var startDate = new Date();
    startDate.setDate(startDate.getDate()-7);
    var request ={
      startDate: startDate,
      endDate: new Date()
    }
    this.getOrderList(request);
  }

  filterData($event: any) {
    console.log($event);
    this.getOrderList($event.daterange);
  }

  getOrderList(request: any) {
    var updatedData = {
      rows: [],
      totalRows: 0
    };
    this.http.post(AppconstantsService.OrderAPIS.GetOrderList,request).then((data: any) => {
      if (data) {
        updatedData.totalRows = data.length;
        for (var i = 0; i < data.length; i++) {
          var row = data[i];
          updatedData.rows.push({
            user: {
              displayName: ((row.FirstName) ? row.FirstName : '') + ' ' + ((row.MiddleName) ? row.MiddleName : ''),
              image: "./assets/img/default_avatar.png",
              id: ((row.Mobile) ? row.Mobile : ''),
              city: ((row.City) ? row.City : ''),
              country: row.country,
              email: row.email,
              address: row.AddressLine1 + ', ' + row.AddressLine2,
              isNew: row.OrderStatus == 1
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
            primaryOrderNumber: row.PrimaryOrderNumber,
            orderPickUpDate:row.OrderPickUpDate,
            status: {
              id: row.OrderStatus,
              statusIcon: this.getOrderStatsImage(row.OrderStatus),
              type: row.OrderStatusName,
              fontColor: 'white',
              bgColor: 'blue'
            },
            accountType: row.OrderTransactionType,
            dateCreated: row.CreateAt,
            isHover: false
          })
        };
        this.setTableData(updatedData);
      }
    }
      , (error: any) => { })
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

  addOrderClick(e: any) {

  }

  deleteOrderClicked(e: any) {

  }


  addOrderDetailsToTable(categoryId: any, index: number) {
    // if (this.OrdersTableConfig.data[index].OrderDetails) {
    //   var details = {
    //     isHtml: true,
    //     value: this.getContent(this.OrdersTableConfig.data[index].OrderDetails)
    //   };
    //   this.OrdersTableConfig.data.splice(index + 1, 0, details);
    // }
    // else {
    this.http.get(AppconstantsService.OrderAPIS.GetOrderDetail + "/" + "247").then((data) => {
      if (data) {
        this.OrdersTableConfig.data[index].OrderDetails = data[0];
        var details = {
          isHtml: true,
          value: this.getContent(data[0])
        };
        this.OrdersTableConfig.data.splice(index + 1, 0, details);
      }
    }, (e) => { });
    // }
    // this.OrdersTableConfig.data[index].subCatExist = "remove_circle";
  }

  getContent(data: any) {
    console.log(data);
    var d = "<td colspan='13'><article class='qview-billing'>"
      + "<div class='qview-heading'><h3>Billing</h3>"
      + "<a class='btn add-btn pointer-cursor hover-focus' md-mini-fab type='button'  title='Copy address to clipboard'><i class='material-icons'>content_copy</i> copy</a>"
      + "</div><div class='qview-colgroup-wrapper qview-order-details'><div class='qview-col'>"
      + "<dl class='dl-horizontal'><dt><span class='hide-visually'> Customer Details </span></dt>"
      + "<dd><div id='qview-billingaddress-101' class='qview-address'>"
      + data.FirstName + "<br />"
      + data.MiddleName + "<br />"
      + data.AddressLine1 + "<br />"
      + data.City + "<br />"
      + (data.AddressLine2 ? JSON.stringify(data.AddressLine2) : "")
      + "</div></dd>"
      + "<dt><span class='hide-visually'> " + data.city + "</span><i class='material-icons'>country</i></dt>"
      //<img src='../lib/flags/ae.gif' align='right' class='qview-flag' />
      + "<dd>" + data.country + "</dd>"
      + "<dt><span class='hide-visually'> " + data.Mobile + " </span><i class='material-icons'>call</i></dt>"
      + "<dd>" + data.Mobile + "</dd>"
      + "<dt><span class='hide-visually'> </span><i class='material-icons'> email </i></dt>"
      + "<dd><a href=" + data.email + ">" + data.email + "</a></dd>"
      + "<dt><span class='hide-visually'> </span><i class='material-icons'> event </i> </dt>"
      + "<dd>" + data.CreateAt + "</dd>"
      + "<dt><span class='hide-visually'> </span><i class='material-icons'> laptop_mac </i></dt>"
      + "<dd></dd>"
      + "<dt><span class='hide-visually'> Order Source </span><i class='material-icons'> laptop </i></dt>"
      + "<dd>" + data.DeviceName + "</dd>"
      + "<dt><span class='hide-visually'> Payment Method </span><i class='material-icons'> credit_card </i></dt>"
      + "<dd> " + data.OrderTransactionType + "</dd>"
      + "<dt><span class='hide-visually'> Payment Status </span><i class='material-icons'> card_membership </i></dt>"
      + "<dd></dd>"
      + "<dt><span class='hide-visually'> Order Comments </span><i class='material-icons'> content_paste </i></dt>"
      + "<dd class='line_height_18'></dd>"
      + "<dt><span class='hide-visually'> Tax Provider </span><i class='material-icons'> exposure</i></dt>"
      + "<dd>" + (data.tax ? JSON.stringify(data.tax) : '') + "</dd>"
      + "</dl>"
      + "</div>"
      + "</div>"
      + "</article>"
      + "<article class='qview-billing'>"
      + "<div class='qview-heading'><h3>Shipping</h3>"
      + "<a class='btn add-btn pointer-cursor hover-focus' md-mini-fab type='button'  title='Copy address to clipboard'><i class='material-icons'>content_copy</i> copy</a>"
      + "</div><div class='qview-colgroup-wrapper qview-order-details'><div class='qview-col'>"
      + "<dl class='dl-horizontal'><dt><span class='hide-visually'> Customer Details </span></dt>"
      + "<dd><div id='qview-billingaddress-101' class='qview-address'>"
      + data.FirstName + "<br />"
      + data.MiddleName + "<br />"
      + data.AddressLine1 + "<br />"
      + data.City + "<br />"
      + (data.AddressLine2 ? JSON.stringify(data.AddressLine2) : "")
      + "</div></dd>"
      + "<dt><span class='hide-visually'> Country </span><img src='../lib/flags/ae.gif' align='right' class='qview-flag' /></dt>"
      + "<dd>United Arab Emirates</dd><dt><span class='hide-visually'> Phone number </span><i class='material-icons'>call</i></dt><dd></dd>"
      + "<dt><span class='hide-visually'> Email </span><i class='material-icons'> email </i></dt>"
      + "<dd><a href=" + data.email + ">" + data.email + "</a><dd>"
      + "<dt><span class='hide-visually'>  </span><i class='material-icons'> event </i> </dt>"
      + "<dd>" + data.CreateAt + "</dd>"
      + "<dt><span class='hide-visually'> IP Address </span><i class='material-icons'> laptop_mac </i></dt>"
      + "<dd></dd>"
      + "<dt><span class='hide-visually'> Order Source </span><i class='material-icons'> laptop </i></dt>"
      + "<dd> <dd>" + data.DeviceName + "</dd></dd>"
      + "<dt><span class='hide-visually'> Payment Method </span><i class='material-icons'> credit_card </i></dt>"
      + "<dd> " + data.OrderTransactionType + "</dd>"
      + "<dt><span class='hide-visually'> Payment Status </span><i class='material-icons'> card_membership </i></dt>"
      + "<dd></dd>"
      + "<dt><span class='hide-visually'> Order Comments </span><i class='material-icons'> content_paste </i></dt>"
      + "<dd  class='line_height_18'>Two or more Item with Free shipping only allow to place the order</dd>"
      + "<dt><span class='hide-visually'> Tax Provider </span><i class='material-icons'> exposure</i></dt>"
      + "<dd>" + (data.tax ? JSON.stringify(data.tax) : '') + "</dd>"
      + "</dl>"
      + "</div>"
      + "</div>"
      + "</article>"
      + "<article class='qview-billing qview-order-items'>"
      + "<div class='qview-heading'><h3>Order</h3> <strong>1 item</strong></div>"
      + "<div class='qview-colgroup-wrapper qview-order-details'>"
      + "<div class='qview-col'>"
      + "<dl class='qview-product'><dt class='hide-visually'>Product Quantity x Product Name</dt>"
      + "<dd class='qview-product-name'><span class='note'> " + data.Quantity + " x </span><a href='#' target='_blank'>" + data.itemName + "</a></dd>"
      + "<dt class='hide-visually'>Sub Total</dt><dd class='qview-product-total'>AED" + data.SubTotal + "</dd>"
      + "<dt class='hide-visually'>Product Sku</dt>"
      + "<dd><span class='note'>ABS</span></dd>"
      + "</dl>"
      + "<a class='btn add-btn pointer-cursor hover-focus mb-2' md-mini-fab type='button'  title='Shipping item'><i class='material-icons'>local_shipping</i>Shipping item</a>"
      + "</div>"
      + "</div>"
      + "<div class='qview-order-total'>"
      + "<div class='order-cont'>"
      + "<div class='order-row'><span class='tit'>Subtotal</span> <span class='val'>AED" + data.SubTotal + "</span></div>"
      + "<div class='order-row'><span class='tit'>Tax</span> <span class='val'>AED" + data.tax + "</span></div>"
      + "<div class='order-row'><span class='tit'>Shipping</span> <span class='val'>AED" + data.shipping + "</span></div>"
      + "<div class='order-row grand-total'><span class='tit'>Grand Total</span> <span class='val'>AED" + data.Total + "</span></div>"
      + "</div>"
      + "</div>"
      + "</article></td>";
    return d;
  }

  removeOrderDetails(categoryId: any, index: number) {
    this.OrdersTableConfig.data.splice(index + 1, 1);
    this.OrdersTableConfig.data[index].subCatExist = "add_circle";
  }

  onAnyAction(e: any, modal: any) {
    console.log(e);
    switch (e.action) {
      case 'rowSelected':
        this.http.detailPageData = e.row;
        this.route.navigate(["/orders/view/detail"]);
        break;
      case "click":
        var categoryId = e.row.CategoryId;
        if (e.columnHeader.id == "subCatExist") {
          if (e.columnHeader.id == "subCatExist") {
            if (e.row.subCatExist == "add_circle") {
              this.addOrderDetailsToTable(categoryId, e.index);
            }
            else {
              this.removeOrderDetails(categoryId, e.index);
            }
          }
        }
        else {

        }
        break;
      case "edit":
        // this.currentOrder = e.row;
        // this.openModel(modal);
        break;
    }
  }

  openModel(model: any) {
    this.modalService.open(model, { size: 'lg', backdrop: 'static', centered: true, windowClass: "customModalClass" });
  }

  closeModel() {
    this.modalService.dismissAll();
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

  onTabSelected(tabId: number) {
    this.filterIndex = tabId;
    let gridModel = {
      start: 0,
      limit: this.OrdersTableConfig.currentPageSize,
      sortCol: this.OrdersTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    }
    this.getDatFromServer(gridModel);
  }

}
