import { Component, OnInit } from "@angular/core";
import { GridModel } from "../../models/grid.model";
import { AppconstantsService } from "../../service/core/appconstants.service";
import { HttpUtilityService } from "../../service/core/httputility.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.scss"],
})
export class SupplierListComponent implements OnInit {
  constructor(public http: HttpUtilityService, private route: Router) {
    let gridModel = {
      start: 0,
      limit: this.OrdersTableConfig.currentPageSize,
      sortCol: this.OrdersTableConfig.sortCol,
      sortOrder: 1,
      searchVal: "",
    };
    this.getDatFromServer(gridModel);
  }

  ngOnInit(): void {}

  filterIndex: number = 0;
  selectedOrderIndex = -1;
  currentOrder = {};

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
      backgroundImage:
        "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      displayName: "Steven Gonzalez",
      email: "abcd@abcd.com",
      title: "Spin the Wheel to get Price of the Week",
      total: "AED 501",
      qty: 5,
      orderNumber: "40",
      deviceUsed: "Android",
      status: {
        status: "Processing",
        statusIcon: "./assets/img/orderStatus/pending.png",
        type: "Platinum",
      },
      type: "Credit Card",
      dateCreated: "2018/04/25 02:07:59",
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
      backgroundImage:
        "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
      displayName: "Josephine Goodman",
      email: "abcd@abcd.com",
      title: "Get Ramadan Deal, Are You ready to Spin?",
      total: "AED 501",
      qty: 5,
      orderNumber: "50",
      deviceUsed: "Android",
      status: {
        status: "Awaiting Payment",
        statusIcon: "./assets/img/orderStatus/ready-pickup.png",
        type: "Gold",
      },
      type: "Credit Card",
      dateCreated: "2018/04/25 02:07:59",
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
      backgroundImage:
        "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
      email: "abcd@abcd.com",
      displayName: "Mario Harmon",
      title: "Spin the Wheel to get Price of the Week",
      total: "AED 501",
      qty: 5,
      orderNumber: "60",
      deviceUsed: "Android",
      status: {
        status: "Order In Progress",
        statusIcon: "./assets/img/orderStatus/ordered.png",
        type: "Silver",
      },
      type: "Credit Card",
      dateCreated: "2018/04/25 02:07:59",
      from: "2018/04/25 02:07:59",
      to: "2018/04/25 02:07:59",
      isHover: false,
    },
  ];

  OrdersTableConfig: GridModel = {
    EnableSearch: true,
    tableHeader: "Order",
    enablePagination: true,
    columns: ([] = [
      {
        name: "Checkbox",
        type: "checkbox",
        id: "checkbox",
      },
      {
        name: "Supplier Name",
        type: "user",
        id: "user",
        sortable: true,
      },
      {
        name: "Email Id",
        type: "string",
        id: "email",
        sortable: true,
      },
      {
        name: "Registration Date",
        type: "date",
        id: "dateCreated",
        sortable: true,
      },
      {
        name: "Validity From",
        type: "date",
        id: "from",
        sortable: true,
      },
      {
        name: "Validity To",
        type: "date",
        id: "to",
        sortable: true,
      },
      {
        name: "Payment Mode",
        type: "string",
        id: "type",
        sortable: true,
      },
      {
        name: "Status",
        type: "status",
        cardType: "",
        id: "statusText",
        sortable: true,
      },
    ]),
    data: [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: "CreateAt",
    sortOrder: 1,
  };

  setTableData(data: any, gridModel: any) {
    console.log(data);
    this.OrdersTableConfig.data = data;
    this.OrdersTableConfig.totalRows = data.length;
  }

  getDatFromServer(gridModel: any) {
    this.OrdersTableConfig.currentPageSize = gridModel.limit;
    this.setTableData(this.sampleData, gridModel);
    // this.http.post(AppconstantsService.OrderAPIS.GetOrderList + "/" + this.filterIndex, gridModel).then((data: any) => {
    //   if (data) {
    //     for (var i = 0; i < data.rows.length; i++) {
    //       data.rows[i].subCatExist = "add_circle";
    //       data.rows[i].statusColor = this.getStatusColor(data.rows[i].OrderStatus);
    //     };
    //     this.setTableData(data, gridModel);
    //   }
    // }
    //   , (error: any) => { })
    this.http
      .get(AppconstantsService.UsersAPIS.GetSupplierDetailsbybranchCode)
      .then(
        (data: any) => {
          var updatedData = [];
          data.forEach((element) => {
            updatedData.push({
              user: {
                displayName: element.suppName,
                image: element.AvatarLocation,
                id: element.suppID,
                city: "",
                country: "",
                email: element.suppEmail,
                address: element.suppAdd1,
                type: element.SupplierType,
                isNew: false,
              },
              displayName: element.suppName,
              email: element.suppEmail,
              dateCreated: element.CreateDate,
              from: element.SubscriptionValidityFrom,
              to: element.SubscriptionValidityUpTo,
              phone: element.suppMob,
              type: element.SupplierType,
              isSupplier: "Yes",
              deviceUsed: element.DeviceName,
              statusIcon: this.getOrderStatsImage(element.suppStatus),
              statusColor: this.getOrderStatsColor(element.suppStatus),
              status: this.getOrderStatsText(element.suppStatus),
            });
          });
          this.setTableData(updatedData, gridModel);
        },
        (error: any) => {}
      );
  }

  addOrderClick(e: any) {}

  deleteOrderClicked(e: any) {}

  addOrderDetailsToTable(categoryId: any, index: number) {
    if (this.OrdersTableConfig.data[index].OrderDetails) {
      var details = {
        isHtml: true,
        value: this.getContent(this.OrdersTableConfig.data[index].OrderDetails),
      };
      this.OrdersTableConfig.data.splice(index + 1, 0, details);
    } else {
      this.http
        .get(
          AppconstantsService.OrderAPIS.GetOrderDetail +
            "/" +
            this.OrdersTableConfig.data[index].OrderID
        )
        .then(
          (data) => {
            if (data) {
              this.OrdersTableConfig.data[index].OrderDetails = data[0];
              var details = {
                isHtml: true,
                value: this.getContent(data[0]),
              };
              this.OrdersTableConfig.data.splice(index + 1, 0, details);
            }
          },
          (e) => {}
        );
    }
    this.OrdersTableConfig.data[index].subCatExist = "remove_circle";
  }

  getContent(data: any) {
    console.log(data);
    var d =
      "<td colspan='13'><article class='qview-billing'>" +
      "<div class='qview-heading'><h3>Billing</h3>" +
      "<a class='btn add-btn pointer-cursor hover-focus' md-mini-fab type='button'  title='Copy address to clipboard'><i class='material-icons'>content_copy</i> copy</a>" +
      "</div><div class='qview-colgroup-wrapper qview-order-details'><div class='qview-col'>" +
      "<dl class='dl-horizontal'><dt><span class='hide-visually'> Customer Details </span></dt>" +
      "<dd><div id='qview-billingaddress-101' class='qview-address'>" +
      data.FirstName +
      "<br />" +
      data.MiddleName +
      "<br />" +
      data.AddressLine1 +
      "<br />" +
      data.City +
      "<br />" +
      (data.AddressLine2 ? JSON.stringify(data.AddressLine2) : "") +
      "</div></dd>" +
      "<dt><span class='hide-visually'> " +
      data.city +
      "</span><i class='material-icons'>country</i></dt>" +
      //<img src='../lib/flags/ae.gif' align='right' class='qview-flag' />
      "<dd>" +
      data.country +
      "</dd>" +
      "<dt><span class='hide-visually'> " +
      data.Mobile +
      " </span><i class='material-icons'>call</i></dt>" +
      "<dd>" +
      data.Mobile +
      "</dd>" +
      "<dt><span class='hide-visually'> </span><i class='material-icons'> email </i></dt>" +
      "<dd><a href=" +
      data.email +
      ">" +
      data.email +
      "</a></dd>" +
      "<dt><span class='hide-visually'> </span><i class='material-icons'> event </i> </dt>" +
      "<dd>" +
      data.CreateAt +
      "</dd>" +
      "<dt><span class='hide-visually'> </span><i class='material-icons'> laptop_mac </i></dt>" +
      "<dd></dd>" +
      "<dt><span class='hide-visually'> Order Source </span><i class='material-icons'> laptop </i></dt>" +
      "<dd>" +
      data.DeviceName +
      "</dd>" +
      "<dt><span class='hide-visually'> Payment Method </span><i class='material-icons'> credit_card </i></dt>" +
      "<dd> " +
      data.OrderTransactionType +
      "</dd>" +
      "<dt><span class='hide-visually'> Payment Status </span><i class='material-icons'> card_membership </i></dt>" +
      "<dd></dd>" +
      "<dt><span class='hide-visually'> Order Comments </span><i class='material-icons'> content_paste </i></dt>" +
      "<dd class='line_height_18'></dd>" +
      "<dt><span class='hide-visually'> Tax Provider </span><i class='material-icons'> exposure</i></dt>" +
      "<dd>" +
      (data.tax ? JSON.stringify(data.tax) : "") +
      "</dd>" +
      "</dl>" +
      "</div>" +
      "</div>" +
      "</article>" +
      "<article class='qview-billing'>" +
      "<div class='qview-heading'><h3>Shipping</h3>" +
      "<a class='btn add-btn pointer-cursor hover-focus' md-mini-fab type='button'  title='Copy address to clipboard'><i class='material-icons'>content_copy</i> copy</a>" +
      "</div><div class='qview-colgroup-wrapper qview-order-details'><div class='qview-col'>" +
      "<dl class='dl-horizontal'><dt><span class='hide-visually'> Customer Details </span></dt>" +
      "<dd><div id='qview-billingaddress-101' class='qview-address'>" +
      data.FirstName +
      "<br />" +
      data.MiddleName +
      "<br />" +
      data.AddressLine1 +
      "<br />" +
      data.City +
      "<br />" +
      (data.AddressLine2 ? JSON.stringify(data.AddressLine2) : "") +
      "</div></dd>" +
      "<dt><span class='hide-visually'> Country </span><img src='../lib/flags/ae.gif' align='right' class='qview-flag' /></dt>" +
      "<dd>United Arab Emirates</dd><dt><span class='hide-visually'> Phone number </span><i class='material-icons'>call</i></dt><dd></dd>" +
      "<dt><span class='hide-visually'> Email </span><i class='material-icons'> email </i></dt>" +
      "<dd><a href=" +
      data.email +
      ">" +
      data.email +
      "</a><dd>" +
      "<dt><span class='hide-visually'>  </span><i class='material-icons'> event </i> </dt>" +
      "<dd>" +
      data.CreateAt +
      "</dd>" +
      "<dt><span class='hide-visually'> IP Address </span><i class='material-icons'> laptop_mac </i></dt>" +
      "<dd></dd>" +
      "<dt><span class='hide-visually'> Order Source </span><i class='material-icons'> laptop </i></dt>" +
      "<dd> <dd>" +
      data.DeviceName +
      "</dd></dd>" +
      "<dt><span class='hide-visually'> Payment Method </span><i class='material-icons'> credit_card </i></dt>" +
      "<dd> " +
      data.OrderTransactionType +
      "</dd>" +
      "<dt><span class='hide-visually'> Payment Status </span><i class='material-icons'> card_membership </i></dt>" +
      "<dd></dd>" +
      "<dt><span class='hide-visually'> Order Comments </span><i class='material-icons'> content_paste </i></dt>" +
      "<dd  class='line_height_18'>Two or more Item with Free shipping only allow to place the order</dd>" +
      "<dt><span class='hide-visually'> Tax Provider </span><i class='material-icons'> exposure</i></dt>" +
      "<dd>" +
      (data.tax ? JSON.stringify(data.tax) : "") +
      "</dd>" +
      "</dl>" +
      "</div>" +
      "</div>" +
      "</article>" +
      "<article class='qview-billing qview-order-items'>" +
      "<div class='qview-heading'><h3>Order</h3> <strong>1 item</strong></div>" +
      "<div class='qview-colgroup-wrapper qview-order-details'>" +
      "<div class='qview-col'>" +
      "<dl class='qview-product'><dt class='hide-visually'>Product Quantity x Product Name</dt>" +
      "<dd class='qview-product-name'><span class='note'> " +
      data.Quantity +
      " x </span><a href='#' target='_blank'>" +
      data.itemName +
      "</a></dd>" +
      "<dt class='hide-visually'>Sub Total</dt><dd class='qview-product-total'>AED" +
      data.SubTotal +
      "</dd>" +
      "<dt class='hide-visually'>Product Sku</dt>" +
      "<dd><span class='note'>ABS</span></dd>" +
      "</dl>" +
      "<a class='btn add-btn pointer-cursor hover-focus mb-2' md-mini-fab type='button'  title='Shipping item'><i class='material-icons'>local_shipping</i>Shipping item</a>" +
      "</div>" +
      "</div>" +
      "<div class='qview-order-total'>" +
      "<div class='order-cont'>" +
      "<div class='order-row'><span class='tit'>Subtotal</span> <span class='val'>AED" +
      data.SubTotal +
      "</span></div>" +
      "<div class='order-row'><span class='tit'>Tax</span> <span class='val'>AED" +
      data.tax +
      "</span></div>" +
      "<div class='order-row'><span class='tit'>Shipping</span> <span class='val'>AED" +
      data.shipping +
      "</span></div>" +
      "<div class='order-row grand-total'><span class='tit'>Grand Total</span> <span class='val'>AED" +
      data.Total +
      "</span></div>" +
      "</div>" +
      "</div>" +
      "</article></td>";
    return d;
  }

  removeOrderDetails(categoryId: any, index: number) {
    this.OrdersTableConfig.data.splice(index + 1, 1);
    this.OrdersTableConfig.data[index].subCatExist = "add_circle";
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "rowSelected":
        this.selectedOrderIndex = e.index;
        this.http.detailPageData = e.row;
        this.route.navigate(["/user/supplier/detail"]);
        break;
      case "click":
        var categoryId = e.row.CategoryId;
        if (e.columnHeader.id == "subCatExist") {
          if (e.columnHeader.id == "subCatExist") {
            if (e.row.subCatExist == "add_circle") {
              this.addOrderDetailsToTable(categoryId, e.index);
            } else {
              this.removeOrderDetails(categoryId, e.index);
            }
          }
        } else {
        }
        break;
      case "edit":
        break;
    }
  }

  getOrderStatsImage(status): string {
    status = status.toLowerCase();
    var statusImage = "./assets/img/orderStatus/ordered.png";
    if (status == "inactive") {
      statusImage = "./assets/img/orderStatus/reject.png";
    } else if (status == "block") {
      statusImage = "./assets/img/orderStatus/blocked.png";
    }
    return statusImage;
  }

  getOrderStatsColor(status): string {
    status = status.toLowerCase();
    var statusImage = "#06d755";
    if (status == "inactive") {
      statusImage = "red";
    } else if (status == "block") {
      statusImage = "#999999";
    }
    return statusImage;
  }

  getOrderStatsText(status): string {
    status = status.toLowerCase();
    var statusImage = "ACTIVE";
    if (status == "inactive") {
      statusImage = "REJECTED";
    } else if (status == "block") {
      statusImage = "BLOCKED";
    }
    return statusImage;
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

  onTabSelected(tabId: number) {
    this.filterIndex = tabId;
    let gridModel = {
      start: 0,
      limit: this.OrdersTableConfig.currentPageSize,
      sortCol: this.OrdersTableConfig.sortCol,
      sortOrder: 1,
      searchVal: "",
    };
    this.getDatFromServer(gridModel);
  }
}
