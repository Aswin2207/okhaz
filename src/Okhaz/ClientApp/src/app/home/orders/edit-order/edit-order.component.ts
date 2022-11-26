import { Component, Input, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class EditOrderComponent implements OnInit {
  @Input('currentOrder') row: any;
  step = 2;
  setTrue: boolean = true;
  setFalse: boolean = false;
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
      name: "Steven Gonzalez",
      displayName: "BarCode : 123456789",
      image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
      reference: '70d4d7d0',
      uom: 'PCS',
      price: '10.24',
      group: 'AED 501',
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
      name: "Josephine Goodman",
      displayName: "BarCode : 123456789",
      image: "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg",
      reference: '70d4d7d0',
      group: 'AED 501',
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
      name: "Mario Harmon",
      displayName: "BarCode : 123456789",
      image: "https://wp.zillowstatic.com/8/Chris-Morrison-97ef0b-300x300.jpg",
      reference: '70d4d7d0',
      group: 'AED 501',
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

  constructor() {}

  ngOnInit(): void {
    console.log(this.row);
  }
}
