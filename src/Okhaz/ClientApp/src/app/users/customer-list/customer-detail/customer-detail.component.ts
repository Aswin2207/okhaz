import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GridModel } from '../../../models/grid.model';
import { AppconstantsService } from '../../../service/core/appconstants.service';
import { HelperService } from '../../../service/core/helper.service';
import { HttpUtilityService } from '../../../service/core/httputility.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})


export class CustomerDetailComponent implements OnInit, OnDestroy {
  step = 0;
  row: any;
  show: boolean = false;
  expiryCount: number = 150;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
 dataSource = ELEMENT_DATA;
  expiryDate: Date = new Date();
  minDate: Date = new Date();
  progress: any[] = [
    {
      icon: "BTC-alt",
      name: "New Order",
      trade: "30",
      progressValue: "30",
      values: "0",
      card_color: "primary-bg"
    },
    {
      icon: "ETC",
      name: "Accepted Order",
      trade: "60",
      progressValue: "60",
      values: "0",
      card_color: "success-bg"
    },
    {
      icon: "LTC-alt",
      name: "On the Way",
      trade: "80",
      progressValue: "80",
      values: "0",
      card_color: "accent-bg"
    },
    {
      icon: "ZEC-alt",
      name: "Cancelled",
      trade: "40",
      progressValue: "40",
      values: "0",
      card_color: "warn-bg"
    }
  ];
  team: Object[] = [];
  orders: Object[] = [];
  uploadTable: any = [];
  sampleData: any[] = [
    {
      user: {
        displayName: "Steven Gonzalez",
        image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
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
      reply: 'reply',
      orderNumber: "40",
      deviceUsed: "Android",
      status: {
        status: 'Processing',
        statusIcon: './assets/img/orderStatus/processing.png',
        type: 'Platinum'
      },
      accountType: 'Credit Card',
      from: '2018/04/25 02:07:59',
      to: '2018/04/25 02:07:59',
      isHover: false
    },
    {
      user: {
        displayName: "Josephine Goodman",
        image: "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
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
      reply: 'reply',
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
      from: '2018/04/25 02:07:59',
      to: '2018/04/25 02:07:59',
      isHover: false
    },
    {
      user: {
        displayName: "Mario Harmon",
        image: "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
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
      reply: 'reply',
      orderNumber: "60",
      deviceUsed: "Android",
      status: {
        status: 'Order In Progress',
        statusIcon: './assets/img/orderStatus/ordered.png',
        type: 'Silver'
      },
      accountType: 'Credit Card',
      from: '2018/04/25 02:07:59',
      to: '2018/04/25 02:07:59',
      isHover: false
    }
  ];
  OrderDetailsConfig: GridModel = {
    EnableSearch: false,
    tableHeader: 'Suppliers',
    enablePagination: true,
    columns: [] = [
      {
        name: 'User',
        type: 'user',
        id: 'user',
        sortable: true
      },
      {
        name: 'Reference',
        type: 'string',
        id: 'reference'
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
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };
  orderWidget = {
    OrderPlaced: "0",
    Accepted: "0",
    OrderOnTheWay: "0",
    Cancelled: "0"
  };
  totalPurchaseAmt = 0;
  customerStatus = false;

  constructor(private helper: HelperService, private modalService: NgbModal, public http: HttpUtilityService, private route: Router) {
  }

  ngOnInit(): void {
    if (this.http.detailPageData) {
      this.row = this.http.detailPageData;
      let gridModel = {
        start: 0,
        limit: this.OrderDetailsConfig.currentPageSize,
        sortCol: this.OrderDetailsConfig.sortCol,
        sortOrder: 1,
        searchVal: ''
      };
      this.getDatFromServer(gridModel);
    }
    else
      this.route.navigate(["/user/customer"]);
  }

  setStep(index: number) {
    this.step = index;
  }

  setTableData(data: any, gridModel: any) {
    this.OrderDetailsConfig.data = data.rows;
    this.OrderDetailsConfig.totalRows = data.rows.length;
  }

  getDatFromServer(gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    var updatedData = {
      rows: [],
      totalRows: 0
    };
    this.http.get(AppconstantsService.UsersAPIS.CustomerOrderWidget + this.row.user.id).then((data: any) => {
      var response = data[0];
      if (response) {
        this.progress[0].values = response.OrderPlaced ? response.OrderPlaced : "0";
        this.progress[1].values = response.Accepted ? response.Accepted : "0";
        this.progress[2].values = response.OrderOnTheWay ? response.OrderOnTheWay : "0";
        this.progress[3].values = response.Cancelled ? response.Cancelled : "0";
      }
    });
    this.http.get(AppconstantsService.UsersAPIS.GetOrderDetailsbyCustId + this.row.user.id).then((data: any) => {
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
        this.setTableData(updatedData, gridModel);
      };
    });
    this.http.get(AppconstantsService.UsersAPIS.TopPurchasedItembyCustomer + this.row.user.id).then((data: any) => {
      data.forEach(element => {
        this.team.push(
          {
            name: element.Item_Name,
            photo: './assets/img/default_avatar.png',
            post: element.ItemId,
            purchase: element.Total_Quantity
          }
        )
      });
    });
    this.http.get(AppconstantsService.UsersAPIS.TopOrdersbyCustomer + this.row.user.id).then((data: any) => {
      data.forEach(element => {
        this.orders.push(
          {
            name: element.FirstName,
            photo: './assets/img/default_avatar.png',
            post: element.OrderRef,
            purchase: element.grandtotal
          }
        )
      });
    });
    this.http.get(AppconstantsService.UsersAPIS.TotalPurchasedAmtbyCustomer + this.row.user.id).then((data: any) => {
     this.totalPurchaseAmt = data[0].Sum_GrandTotal;
    });
    this.customerStatus = this.row.status == 'Active';
  }

  customerStatusChanged() {
    this.row.status = this.customerStatus?'Active':'Inactive';
    console.log(this.row);
    this.http.post(AppconstantsService.UsersAPIS.UpdateCustomerStatus+ this.row.user.id+"/"+this.row.status,{}).then((data: any) => {

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

  openModel(model: any) {
    this.modalService.open(model, { size: 'md', backdrop: 'static', centered: true });
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
  editProfile(){
    this.route.navigate(["/user/customer/edit"]);
  }
  ngOnDestroy() {
    this.http.detailPageData = null;
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
];