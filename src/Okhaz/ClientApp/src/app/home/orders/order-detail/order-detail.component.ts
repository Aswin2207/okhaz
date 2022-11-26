import { Component, Input, OnInit } from '@angular/core';
import { GridModel } from 'src/app/models/grid.model';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input('currentOrder') row: any;
  statusList = [];
  deliveryManList = [];
  step = 0;
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
  displayedColumns: string[] = ['id', 'accountType', 'amount', 'dateCreated'];
  dataSource: any[] = [
    { id: '289tyrV', accountType: 'Credit Card', amount: 166.0079, dateCreated: '2018/04/25 02:07:59' },
    { id: '2789VbU', accountType: 'Credit Card', amount: 48.0026, dateCreated: '2018/04/25 02:07:59' }
  ];;
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
        id: 'orderNumber',
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

  constructor(private http: HttpUtilityService) {
  }

  ngOnInit(): void {
    console.log(this.row);
    let gridModel = {
      start: 0,
      limit: this.OrderDetailsConfig.currentPageSize,
      sortCol: this.OrderDetailsConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(this.row.orderNumber, gridModel);
    this.getOrderStatusList(this.row.status.id);
    this.getDeliveryManList(this.row.deliveryMan);
  }

  getDeliveryManList(deliveryManId: any) {
    var deliveryManList = [];
    this.http.get(AppconstantsService.OrderAPIS.GetDeliveryManList).then((data: any) => {
      data.forEach((element: any) => {
        deliveryManList.push({ value: element.id, label: element.userName });
      });
      console.log(deliveryManList);
      this.orderFields[1].options = deliveryManList;
      this.orderFields[1].fieldValue = deliveryManId;
    });
  }

  getOrderStatusList(orderStatusId: any) {
    var orderStatusList = [];
    this.http.get(AppconstantsService.OrderAPIS.GetOrderStatusList).then((data: any) => {
      data.forEach((element: any) => {
        orderStatusList.push({ value: element.OrderStatusID, label: element.OrderStatusName });
      });
      this.orderFields[0].options = orderStatusList;
      this.orderFields[0].fieldValue = orderStatusId;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  setTableData(data: any, gridModel: any) {
    console.log(data);
    this.OrderDetailsConfig.data = data;
    this.OrderDetailsConfig.totalRows = data.length;
  }

  getDatFromServer(orderNumber, gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    this.http.get(AppconstantsService.OrderAPIS.GetOrderDetail + orderNumber).then((data: any) => {
      console.log(data);
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

}
