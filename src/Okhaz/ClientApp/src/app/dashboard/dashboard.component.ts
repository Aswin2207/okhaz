import { Component, OnInit } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { AppconstantsService } from "app/service/core/appconstants.service";
import { HttpUtilityService } from "app/service/core/httputility.service";
import { HelperService } from "app/service/core/helper.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class DashboardComponent implements OnInit {
  showChart: boolean;
  statsCards = [
    {
      card_color: "primary-bg",
      icon: "shopping_cart",
      title: "Order",
      viewer: "+ 41",
      link: "/orders/view",
      trade: "30",
      count: 2345,
    },
    {
      card_color: "success-bg",
      icon: "add_shopping_cart",
      title: "New Order",
      count: 2442,
      viewer: "+ 4381",
      link: "/orders/add",
      trade: "60",
    },
    {
      card_color: "accent-bg",
      icon: "access_time",
      title: "Pending Order",
      link: "/orders/order-status",
      count: 4456,
      viewer: "+ 2611",
      trade: "80",
    },
    {
      card_color: "warn-bg",
      icon: "directions_bike",
      title: "On The Way",
      link: "/orders/order-status",
      count: 4567,
      viewer: "+ 611",
      trade: "40",
    },
    {
      card_color: "primary-bg",
      icon: "attach_money",
      title: "Revenue",
      link: "/orders/view",
      count: "$1247",
      viewer: "+ 41",
      trade: "30",
    },
    {
      card_color: "success-bg",
      icon: "view_stream",
      title: "Categories",
      count: 3456,
      link: "/products/product-categories",
      viewer: "+ 4381",
      trade: "60",
    },
    {
      card_color: "accent-bg",
      icon: "view_list",
      link: "/products/product-categories",
      title: "Sub Categories",
      count: 6678,
      viewer: "+ 2611",
      trade: "80",
    },
    {
      card_color: "warn-bg",
      icon: "chrome_reader_mode",
      title: "Product",
      link: "/products/view",
      count: 8888,
      viewer: "+ 611",
      trade: "40",
    },
    {
      card_color: "primary-bg",
      icon: "remove_red_eye",
      title: "Customers",
      link: "/orders/view",
      count: 456,
      viewer: "+ 41",
      trade: "30",
    },
    {
      card_color: "success-bg",
      icon: "person",
      title: "Suppliers",
      count: 234,
      link: "/user/supplier",
      viewer: "+ 4381",
      trade: "60",
    },
  ];
  tableTabData = {
    ordersPlacedList: [],
    ordersPendingList: [],
    ordersDeliveredList: [],
    ordersCancelledList: [],
  };
  customerFeedback = [];
  supplierReview = [];
  currentOrderStatus = -1;
  topPurchaseItems = [];
  topRevenueItems = [];
  lowRevenueItems = [];
  // tableTabData = {
  //   "expenseCategory": [{
  //     "itmNo": "#itm001",
  //     "date": "19 Aug 2018",
  //     "type": "Hotel",
  //     "typeColor": "primary",
  //     "description": "Hotel charges",
  //     "amount": "$2000",
  //     "statusColor": "primary",
  //     "status": "paid"
  //   },
  //   {
  //     "itmNo": "#itm002",
  //     "date": "22 Mar 2018",
  //     "type": "Meal",
  //     "typeColor": "accent",
  //     "description": "food delivery charges",
  //     "amount": "$500",
  //     "statusColor": "primary",
  //     "status": "paid"
  //   },
  //   {
  //     "itmNo": "#itm003",
  //     "date": "30 Sep 2018",
  //     "type": "car rental",
  //     "typeColor": "primary",
  //     "description": "car service bill",
  //     "amount": "$1500",
  //     "statusColor": "warn",
  //     "status": "not paid"
  //   },
  //   {
  //     "itmNo": "#itm004",
  //     "date": "20 Aug 2018",
  //     "type": "Health",
  //     "typeColor": "accent",
  //     "description": "Hospital bill",
  //     "amount": "$1700",
  //     "statusColor": "primary",
  //     "status": "paid"
  //   },
  //   {
  //     "itmNo": "#itm005",
  //     "date": "13 Jan 2018",
  //     "type": "accommodation",
  //     "typeColor": "primary",
  //     "description": "House rent",
  //     "amount": "$1290",
  //     "statusColor": "warn",
  //     "status": "Not paid"
  //   },
  //   {
  //     "itmNo": "#itm006",
  //     "date": "24 Mar 2018",
  //     "type": "Meal",
  //     "typeColor": "accent",
  //     "description": "food delivery charges",
  //     "amount": "$500",
  //     "statusColor": "primary",
  //     "status": "paid"
  //   },
  //   {
  //     "itmNo": "#itm007",
  //     "date": "30 Jan 2019",
  //     "type": "accommodation",
  //     "typeColor": "primary",
  //     "description": "House rent",
  //     "amount": "$1290",
  //     "statusColor": "warn",
  //     "status": "Not paid"
  //   }
  //   ],
  //   "transactionList": [{
  //     "transid": "#trn001",
  //     "date": "19 Aug 2018",
  //     "account": "Citibank",
  //     "type": "Saving",
  //     "typeColor": "primary",
  //     "amount": "$2000",
  //     "debit": "$1,807.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   },
  //   {
  //     "transid": "#trn002",
  //     "date": "22 Mar 2018",
  //     "account": "Standard Chartered Bank",
  //     "type": "Income",
  //     "typeColor": "accent",
  //     "amount": "$500",
  //     "debit": "$1,307.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   },
  //   {
  //     "transid": "#trn003",
  //     "date": "30 Sep 2018",
  //     "account": "HSBC Bank",
  //     "type": "Expense",
  //     "typeColor": "warn",
  //     "amount": "$1500",
  //     "debit": "$2,307.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   },
  //   {
  //     "transid": "#trn004",
  //     "date": "20 Aug 2018",
  //     "account": "Deutsche Bank",
  //     "type": "Income",
  //     "typeColor": "accent",
  //     "amount": "$1700",
  //     "debit": "$3,307.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   },
  //   {
  //     "transid": "#trn005",
  //     "date": "13 Jan 2018",
  //     "account": "Bank of Scotland",
  //     "type": "Saving",
  //     "typeColor": "primary",
  //     "amount": "$1290",
  //     "debit": "$1,000.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   },
  //   {
  //     "transid": "#trn006",
  //     "date": "13 Jan 2018",
  //     "account": "Barclays Bank",
  //     "type": "Income",
  //     "typeColor": "accent",
  //     "amount": "$1290",
  //     "debit": "$1,500.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   },
  //   {
  //     "transid": "#trn007",
  //     "date": "13 Jan 2018",
  //     "account": "The Bank of America",
  //     "type": "Expense",
  //     "typeColor": "warn",
  //     "amount": "$1290",
  //     "debit": "$1,709.00",
  //     "credit": "$0.00",
  //     "balance": "$0.00"
  //   }
  //   ],
  //   "transferreport": [{
  //     "transid": "#trn001",
  //     "date": "19 Aug 2018",
  //     "account": "Citibank",
  //     "type": "Saving",
  //     "typeColor": "primary",
  //     "amount": "$2000",
  //     "balance": "$1,807.00",
  //     "statusColor": "primary",
  //     "status": "Send"
  //   },
  //   {
  //     "transid": "#trn002",
  //     "date": "22 Mar 2018",
  //     "account": "Standard Chartered Bank",
  //     "type": "Income",
  //     "typeColor": "accent",
  //     "amount": "$500",
  //     "balance": "$1,807.00",
  //     "statusColor": "warn",
  //     "status": "Not Send"
  //   },
  //   {
  //     "transid": "#trn003",
  //     "date": "30 Sep 2018",
  //     "account": "HSBC Bank",
  //     "type": "Expense",
  //     "typeColor": "warn",
  //     "amount": "$1500",
  //     "balance": "$1,807.00",
  //     "statusColor": "primary",
  //     "status": "Send"
  //   },
  //   {
  //     "transid": "#trn004",
  //     "date": "20 Aug 2018",
  //     "account": "Deutsche Bank",
  //     "type": "Income",
  //     "typeColor": "accent",
  //     "amount": "$1700",
  //     "balance": "$1,807.00",
  //     "statusColor": "primary",
  //     "status": "Send"
  //   },
  //   {
  //     "transid": "#trn005",
  //     "date": "13 Jan 2018",
  //     "account": "Bank of Scotland",
  //     "type": "Saving",
  //     "typeColor": "primary",
  //     "amount": "$1290",
  //     "balance": "$1,807.00",
  //     "statusColor": "warn",
  //     "status": "Not Send"
  //   },
  //   {
  //     "transid": "#trn006",
  //     "date": "13 Jan 2018",
  //     "account": "Barclays Bank",
  //     "type": "Income",
  //     "typeColor": "accent",
  //     "amount": "$1290",
  //     "balance": "$1,807.00",
  //     "statusColor": "primary",
  //     "status": "Send"
  //   },
  //   {
  //     "transid": "#trn007",
  //     "date": "13 Jan 2018",
  //     "account": "The Bank of America",
  //     "type": "Expense",
  //     "typeColor": "warn",
  //     "amount": "$1290",
  //     "balance": "$1,807.00",
  //     "statusColor": "warn",
  //     "status": "Not Send"
  //   }
  //   ]
  // };
  liveChatSupport = [
    {
      image: "assets/img/register-user-3.jpg",
      name: "Devy Finn",
      rating: 4,
      chat: "Hi There! Recently I updated the latest version of your app, it crashed every time when i open.Please help me out as soon as possible.....Thanks",
      time: "10 Min ago",
      classSendBy: "sender",
    },
    {
      image: "assets/img/register-user-1.jpg",
      name: "Sam Brown",
      rating: 2,
      chat: "Hi Devy, Can you please tell us your mobile configuraion.So that We can help you better.Please Also specify Version of your phone....Thank You!",
      time: "8 Min ago",
      classSendBy: "sender",
    },
  ];
  team: Object[] = [
    {
      name: "Isabela Phelaps",
      photo: "assets/img/user-1.jpg",
      post: "Sr.Manager",
      purchase: "4",
    },
    {
      name: "Trevor Hansen",
      photo: "assets/img/user-2.jpg",
      post: "Manager",
      purchase: "6",
    },
    {
      name: "Sandra Adams",
      photo: "assets/img/user-3.jpg",
      post: "Engineer",
      purchase: "5",
    },
    {
      name: "Sandy Smith",
      photo: "assets/img/user-4.jpg",
      post: "Engineer",
      purchase: "10",
    },
  ];
  displayedTransactionColumns: string[] = [
    "user",
    "reference",
    "total",
    "qty",
    "accountType",
    "dateCreated",
  ];
  displayedTransferColumns: string[] = [
    "transid",
    "date",
    "account",
    "type",
    "amount",
    "balance",
    "status",
  ];
  displayedExpenseColumns: string[] = [
    "itmNo",
    "date",
    "type",
    "description",
    "amount",
    "status",
  ];
  //Mixed Chart
  public mixedChartLabels: Array<any> = [
    "04/22",
    "04/23",
    "04/24",
    "04/25",
    "04/26",
    "04/27",
    "04/28",
  ];
  public mixedChartLegend: boolean = false;
  visitsMixCharts: Array<any> = [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: "Series A",
      borderWidth: 3,
      type: "line",
      fill: false,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: "Series B",
      borderWidth: 1,
      type: "bar",
    },
  ];
  conversionMixCharts: Array<any> = [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: "Series A",
      borderWidth: 3,
      type: "line",
      fill: false,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: "Series B",
      borderWidth: 1,
      type: "bar",
    },
  ];
  revenueMixCharts: Array<any> = [
    {
      data: [5, 4, 5, 2, 6, 3, 5],
      label: "Revenue",
      borderWidth: 3,
      type: "line",
      fill: false,
    },
    {
      data: [6, 5, 8, 8, 5, 5, 4],
      label: "Sales",
      borderWidth: 1,
      type: "bar",
    },
  ];
  ordersMixCharts: Array<any> = [
    {
      data: [6, 5, 8, 8, 5, 5, 4],
      label: "Orders",
      borderWidth: 3,
      type: "line",
      fill: false,
    },
    {
      data: [5, 4, 5, 2, 6, 3, 5],
      label: "Completed",
      borderWidth: 1,
      type: "bar",
    },
  ];
  orderChartLabels: Array<any> = [];
  revenueChartLabels: Array<any> = [];
  orderTrackNumber = "";
  mixedChartColors: Array<any> = [
    {
      backgroundColor: "rgba(67, 210, 158, 1)",
      borderColor: "rgba(67, 210, 158, 1)",
      pointBackgroundColor: "rgba(67, 210, 158, 1)",
      pointBorderColor: "rgba(67, 210, 158, 1)",
      pointHoverBackgroundColor: "rgba(67, 210, 158, 1)",
      pointHoverBorderColor: "rgba(67, 210, 158, 1)",
    },
    {
      backgroundColor: "rgba(240, 242, 247, 1)",
      borderColor: "rgba(240, 242, 247, 1)",
      pointBackgroundColor: "rgba(240, 242, 247, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(240, 242, 247, 1)",
    },
  ];
  mixedChartOptions: any = {
    animation: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMax: 9,
          },
        },
      ],
    },
    responsive: true,
  };
  public barChartLabels: string[] = [
    "Safari",
    "Chrome",
    "Opera",
    "IE+",
    "Firefox",
  ];
  public barChartType: string = "bar";
  branchName: string = "QTP Mart";
  branchInfo: any;
  userInfo: any;
  constructor(public http: HttpUtilityService, private helper: HelperService) {
    var data = this.helper.getDataFromStorageDetails("BranchInfo");
    if (data) {
      data = JSON.parse(data);
      this.branchInfo = data.BranchInfo;
      this.userInfo = data.UserDetails;
      this.branchName = this.branchInfo.branchname;
      console.log(this.branchInfo);
      console.log(this.userInfo);
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showChart = true;
    }, 1000);
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderCountsbyBranchCode)
      .then((data: any) => {
        this.statsCards[0].count = data[0].OrderID_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderPendingCountsbyBranchCode)
      .then((data: any) => {
        this.statsCards[2].count = data[0].OrderID_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderPlacedCountsbyBranchCode)
      .then((data: any) => {
        this.statsCards[1].count = data[0].OrderID_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderProgressCountsbyBranchCode)
      .then((data: any) => {
        this.statsCards[3].count = data[0].OrderID_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderTotalbyBranchCode)
      .then((data: any) => {
        this.statsCards[4].count = Math.round(data[0].Sum_GrandTotal);
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetCategoryCountbyBranchCode)
      .then((data: any) => {
        this.statsCards[5].count = data[0].CategoryID_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetSubCategoryCountbyBranchCode)
      .then((data: any) => {
        this.statsCards[6].count = data[0].CategoryID_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetItemNameCountbyBranchCode)
      .then((data: any) => {
        this.statsCards[7].count = data[0].itemName_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetSuppNameCountbyBranchCode)
      .then((data: any) => {
        this.statsCards[9].count = data[0].suppName_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetCustNameCountbyBranchCode)
      .then((data: any) => {
        this.statsCards[8].count = data[0].custName_Count;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderPlacedFetchbyBranchCode)
      .then((data: any) => {
        this.tableTabData.ordersPlacedList = [];
        if (data) {
          for (var i = 0; i < data.length; i++) {
            var row = data[i];
            this.tableTabData.ordersPlacedList.push({
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
              dateCreated: this.getDate(row.CreateAt),
              isHover: false,
            });
          }
          this.tableTabData.ordersPlacedList.reverse();
        }
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderPendingFetchbyBranchCode)
      .then((data: any) => {
        this.tableTabData.ordersPendingList = [];
        if (data) {
          for (var i = 0; i < data.length; i++) {
            var row = data[i];
            this.tableTabData.ordersPendingList.push({
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
              dateCreated: this.getDate(row.CreateAt),
              isHover: false,
            });
          }
          this.tableTabData.ordersPendingList.reverse();
        }
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderDeliveredFetchbyBranchCode)
      .then((data: any) => {
        this.tableTabData.ordersDeliveredList = [];
        if (data) {
          for (var i = 0; i < data.length; i++) {
            var row = data[i];
            this.tableTabData.ordersDeliveredList.push({
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
              dateCreated: this.getDate(row.CreateAt),
              isHover: false,
            });
          }
          this.tableTabData.ordersDeliveredList.reverse();
        }
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderCancelledFetchbyBranchCode)
      .then((data: any) => {
        this.tableTabData.ordersCancelledList = [];
        if (data) {
          for (var i = 0; i < data.length; i++) {
            var row = data[i];
            this.tableTabData.ordersCancelledList.push({
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
              dateCreated: this.getDate(row.CreateAt),
              isHover: false,
            });
          }
          this.tableTabData.ordersCancelledList.reverse();
        }
      });
    this.http
      .get(
        AppconstantsService.dashboardAPIS.GetCustomerFeedBackFetchbyBranchCode
      )
      .then((data: any) => {
        // this.customerFeedback = data;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetSupplierReviewFetchbyBranchCode)
      .then((data: any) => {
        // this.supplierReview = data;
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetOrderCountswithDatebyBranchCode)
      .then((data: any) => {
        this.orderChartLabels = data.map((ele) =>
          this.getChartDate(ele.CreateAt)
        );
        var orderData = data.map((ele) => parseInt(ele.OrderID_Count));
        this.ordersMixCharts[0].data = orderData;
        this.ordersMixCharts[1].data = orderData;
      });
    this.http
      .get(
        AppconstantsService.dashboardAPIS.GetOrderRevenueswithDatebyBranchCode
      )
      .then((data: any) => {
        this.revenueChartLabels = data.map((ele) =>
          this.getChartDate(ele.CreateAt)
        );
        var revenueData = data.map((ele) => parseInt(ele.Sum_GrandTotal));
        this.revenueMixCharts[0].data = revenueData;
        this.revenueMixCharts[1].data = revenueData;
      });
    this.getTopPurchaseItems();
    this.getRevenueItems();
    this.setLastWeekDays();
  }

  setLastWeekDays() {
    var today = new Date();
    var firstDay = new Date();
    firstDay.setDate(today.getDate() - 6);
    var secondDay = new Date();
    secondDay.setDate(today.getDate() - 5);
    var thirdDay = new Date();
    thirdDay.setDate(today.getDate() - 4);
    var fourthDay = new Date();
    fourthDay.setDate(today.getDate() - 3);
    var fifthDay = new Date();
    fifthDay.setDate(today.getDate() - 2);
    var sixthDay = new Date();
    sixthDay.setDate(today.getDate() - 1);
    this.mixedChartLabels = [
      this.getChartDayString(firstDay),
      this.getChartDayString(secondDay),
      this.getChartDayString(thirdDay),
      this.getChartDayString(fourthDay),
      this.getChartDayString(fifthDay),
      this.getChartDayString(sixthDay),
      this.getChartDayString(today),
    ];
  }

  getChartDate(date: string) {
    var updatedDate = date.split(" ")[0];
    var dateArray = updatedDate.split("-");
    return dateArray[1] + "/" + dateArray[0];
  }

  getChartDayString(date: Date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return (
      (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day)
    );
  }

  getRevenueItems() {
    this.http
      .get(AppconstantsService.dashboardAPIS.GetTopRevItembyBranch)
      .then((data: any) => {
        this.topRevenueItems = data.slice(0, 20);
      });
    this.http
      .get(AppconstantsService.dashboardAPIS.GetLowRevItembyBranch)
      .then((data: any) => {
        // this.customerFeedback = data;
        this.lowRevenueItems = data.slice(0, 20);
      });
  }

  getTopPurchaseItems() {
    this.http
      .get(AppconstantsService.dashboardAPIS.GetTopSoldItembyBranch)
      .then((data: any) => {
        this.topPurchaseItems = data.slice(0, 20);
      });
  }

  getRoundOff(value) {
    return Math.round(parseInt(value));
  }

  getDate(date: any) {
    if (!date) {
      return;
    }
    var trimDate = date.split(" ")[0];
    var dates = trimDate.split("-");
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return dates[0] + " " + monthNames[dates[1] - 1] + ", " + dates[2];
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

  getTrackProgress() {
    this.http
      .get(
        AppconstantsService.dashboardAPIS.GetOrderStatusbyOrderID +
          this.orderTrackNumber
      )
      .then((data: any) => {
        this.currentOrderStatus = 0;
        if (data[0])
          if (data[0].OrderStatusID != "") {
            var status = parseInt(data[0].OrderStatusID);
            if (status <= 2) {
              this.currentOrderStatus = 1;
            } else if (status <= 5) {
              this.currentOrderStatus = 2;
            } else if (status <= 6) {
              this.currentOrderStatus = 3;
            } else if (status <= 7) {
              this.currentOrderStatus = 4;
            } else {
              this.currentOrderStatus = 4;
            }
          }
      });
  }
}
