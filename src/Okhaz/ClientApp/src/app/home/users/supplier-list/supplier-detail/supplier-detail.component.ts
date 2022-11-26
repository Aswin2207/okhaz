import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { GridModel } from 'src/app/models/grid.model';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';
import { FileUploader } from 'ng2-file-upload';
import { HelperService } from 'src/app/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  step = 0;
  @Input('currentOrder') row: {};
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
        name: 'Action',
        type: 'orderAction'
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };
  FileUploadConfig: GridModel = {
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
        name: 'File',
        type: 'user',
        id: 'user',
        sortable: true
      },
      {
        name: 'Document Number',
        type: 'string',
        id: 'reference',
        sortable: true
      },
      {
        name: 'Document Type',
        type: 'string',
        id: 'accountType',
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
        name: 'Action',
        type: 'orderAction'
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };
  uploadDetails = [
    {
      fieldId: "documentNumber",
      label: "Document Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide document number",
      required: true
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
        { value: 'Passport', label: 'Passport' },
        { value: 'Digital', label: 'Digital' },
      ]
    },
    {
      fieldId: "document",
      label: "Document",
      fieldValue: null,
      type: "file",
      isValid: true,
      errorMesg: "Please provide document",
      required: true
    }
  ];
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;

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
    this.FileUploadConfig.data = this.uploadTable;
    this.FileUploadConfig.totalRows = this.uploadTable.length;
  }

  getDatFromServer(gridModel: any) {
    this.OrderDetailsConfig.currentPageSize = gridModel.limit;
    this.FileUploadConfig.currentPageSize = gridModel.limit;
    this.setTableData(this.sampleData, gridModel);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
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

  public onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    this.readBase64(file)
      .then((data) => {
        this.uploadDetails[2].fieldValue = data;
      })
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
          isNew: true
        },
        id: this.uploadTable.length ? parseInt(this.uploadTable[this.uploadTable.length - 1].id) + 1 : 1,
        reference: this.uploadDetails[0].fieldValue,
        uom: 'PCS',
        price: '10.24',
        total: '1',
        qty: 5,
        orderNumber: "40",
        deviceUsed: "Android",
        status: {
          status: 'Order In Progress',
          statusIcon: './assets/img/orderStatus/ordered.png',
          type: 'Silver'
        },
        accountType: this.uploadDetails[1].fieldValue,
        dateCreated: '2018/04/25 02:07:59',
        isHover: false
      };
      this.uploadTable.push(uploadInfo);
      this.clear();
    }
    else {
      this.helper.showErrorTostMessage("Please fill all mandatory data.");
    }
  }

  clear() {
    this.uploader = new FileUploader({
      allowedFileType: ['image']
    });
    this.uploadDetails.map(x => x.fieldValue = null);
  }

  readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.addEventListener("error", function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
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
