import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { GridModel } from '../../../../models/GridModel';
import { AppconstantsService } from '../../../../service/core/appconstants.service';
import { HttpUtilityService } from '../../../../service/core/httputility.service';
import { HelperService } from '../../../../../../src/app/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  step = 0;
  @Input('currentOrder') row:any= {};
  expiryCount: number = 150;
  expiryDate: Date = new Date();
  minDate: Date = new Date();
  progress: any[] = [
    {
      icon: "BTC-alt",
      name: "New Order",
      trade: "30",
      progressValue: "30",
      values: "100",
      card_color: "primary-bg"
    },
    {
      icon: "ETC",
      name: "Accepted Order",
      trade: "60",
      progressValue: "60",
      values: "120",
      card_color: "success-bg"
    },
    {
      icon: "LTC-alt",
      name: "On the Way",
      trade: "80",
      progressValue: "80",
      values: "13",
      card_color: "accent-bg"
    },
    {
      icon: "ZEC-alt",
      name: "Cancelled",
      trade: "40",
      progressValue: "40",
      values: "1",
      card_color: "warn-bg"
    }
  ];
  team: Object[] = [{
		name: 'Isabela Phelaps',
		photo: 'assets/img/user-1.jpg',
		post: 'Sr.Manager',
    purchase: '4'
	}, {
		name: 'Trevor Hansen',
		photo: 'assets/img/user-2.jpg',
		post: 'Manager',
    purchase: '6'
	}, {
		name: 'Sandra Adams',
		photo: 'assets/img/user-3.jpg',
		post: 'Engineer',
    purchase: '5'
	},{
		name: 'Sandy Smith',
		photo: 'assets/img/user-4.jpg',
		post: 'Engineer',
    purchase: '10'
	},{
		name: 'Rosy Wonn',
		photo: 'assets/img/user-5.jpg',
		post: 'Jr.Engineer',
    purchase: '7'
	},{
		name: 'Alex Roddy',
		photo: 'assets/img/user-6.jpg',
		post: 'Jr.Engineer',
    purchase: '2'
	}];
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
      dateCreated: '2018/04/25 02:07:59',
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
      dateCreated: '2018/04/25 02:07:59',
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
      dateCreated: '2018/04/25 02:07:59',
      isHover: false
    }
  ];
  OrderDetailsConfig: GridModel = {
    EnableSearch: false,
    tableHeader: 'Suppliers',
    enablePagination: true,
    columns: [] = [
      {
        name: 'Checkbox',
        type: 'checkbox',
        id: 'checkbox'
      },
      {
        name: 'Subscription Plan',
        type: 'user',
        id: 'user',
        sortable: true
      },
      {
        name: 'Subscription Date',
        type: 'string',
        id: 'dateCreated',
        sortable: true
      },
      {
        name: 'Expiry Date',
        type: 'string',
        id: 'dateCreated',
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
      {
        name:'Action',
        type:'button',
        id:'reply',
        iconClass:'reply',
        compareVal:'false',
        activeClass:'cc',
        usedefaultIcon:false
      },
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };

  constructor(private helper: HelperService, private modalService: NgbModal, private http: HttpUtilityService) {
    let gridModel = {
      start: 0,
      limit: this.OrderDetailsConfig.currentPageSize,
      sortCol: this.OrderDetailsConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(gridModel);
  }

  ngOnInit(): void {
    // this.row = this.sampleData[0];
  }

  setStep(index: number) {
    this.step = index;
  }

  setTableData(data: any, gridModel: any) {
    console.log(data);
    this.OrderDetailsConfig.data = this.sampleData;
    this.OrderDetailsConfig.totalRows = this.sampleData.length;
  }

  getDatFromServer(gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    this.setTableData(this.sampleData, gridModel);
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

}
