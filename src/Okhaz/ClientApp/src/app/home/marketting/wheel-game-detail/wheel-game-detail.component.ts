import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { GridModel } from 'src/app/models/grid.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';
import { CodeValueModel, WheelModel, WheelConfigModel, WheelActionModel, ActionItems } from '../marketting.model';

@Component({
  selector: 'app-wheel-game-detail',
  templateUrl: './wheel-game-detail.component.html',
  styleUrls: ['./wheel-game-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WheelGameDetailComponent implements OnInit {
  @Input('currentOrder') row: {};
  imagePath: any = "./assets/img/noImg_placeholder.jpeg";
  @ViewChild('fileToUpload') fileUploaded?: ElementRef<HTMLElement>;
  File: any;
  isMaximize: boolean = false;
  isEdit: boolean = false;
  formData: WheelModel = new WheelModel();
  wheelConfig: WheelConfigModel = new WheelConfigModel();
  action: WheelActionModel;

  mainImgPath: string = "";
  colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
  sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
  quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  mainImage?: File;
  galleryFiles: File[] = [];
  selectedImage: any = "http://via.placeholder.com/625x800";

  triggerAll: CodeValueModel = { code: 'Active', value: false };
  deviceList: CodeValueModel[] = [
    { code: 'Android', value: false },
    { code: 'iPhone', value: false },
    { code: 'Website', value: false }
  ];
  textColors: CodeValueModel[] = [
    { code: '#7c90c1', value: true },
    { code: '#9d8594', value: true },
    { code: '#dad0d8', value: true },
    { code: '#3f7a89', value: true },
    { code: '#96c582', value: true },
    { code: '#b7d5c4', value: true },
    { code: '#bcd6e7', value: true },
    { code: '#f3746a', value: true },
    { code: '#50e49a', value: true },
    { code: '#33a5ef', value: true },
    { code: '#7d23da', value: true },
    { code: '#1023ac', value: true },
    { code: '#294716', value: true },
    { code: '#c455e4', value: true },
    { code: '#e969e0', value: true },
    { code: '#d4fc9d', value: true },
    { code: '#02d153', value: true },
    { code: '#0b52ce', value: true },
    { code: '#b5ebfb', value: true },
    { code: '#0d3681', value: true },
    { code: '#60c715', value: true }
  ];
  bgColors: CodeValueModel[] = [];
  displayedColumns: string[] = ['id', 'button', 'name', 'textColor', 'bgColor', 'image', 'status', 'action'];
  dataSource: WheelModel[] = [
    { id: '1', name: 'Supplier 1', textColor: '#804c00', bgColor: '#74efff', status: true, image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg" },
    { id: '2', name: 'Supplier 2', textColor: '#804c00', bgColor: '#97cef9', status: true, image: "" },
    { id: '3', name: 'Supplier 3', textColor: '#804c00', bgColor: '#da92e7', status: false, image: "" },
    { id: '4', name: 'Supplier 4', textColor: 'white', bgColor: '#fbbab5', status: true, image: "" },
    { id: '5', name: 'Supplier 5', textColor: '#804c00', bgColor: '#ffc673', status: true, image: "" },
    { id: '6', name: 'Supplier 6', textColor: '#804c00', bgColor: '#fff6a3', status: false, image: "" },
    { id: '7', name: 'Supplier 7', textColor: 'white', bgColor: '#e8efa3', status: true, image: "" },
    { id: '8', name: 'Supplier 8', textColor: '#804c00', bgColor: '#74efff', status: true, image: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg" },
    { id: '9', name: 'Supplier 9', textColor: '#804c00', bgColor: '#97cef9', status: true, image: "" },
    { id: '10', name: 'Supplier 10', textColor: 'black', bgColor: '#da92e7', status: false, image: "" },
    { id: '11', name: 'Supplier 11', textColor: '#804c00', bgColor: '#fbbab5', status: true, image: "" },
    { id: '12', name: 'Supplier 12', textColor: '#804c00', bgColor: '#ffc673', status: true, image: "" }
  ];
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

  constructor(private http: HttpUtilityService, private modalService: NgbModal) {
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
    this.textColors.unshift({ code: 'paint', value: true });
    this.textColors.splice(8, 0, { code: 'time', value: true });
    this.textColors.splice(16, 0, { code: 'brush', value: true });
    this.bgColors = JSON.parse(JSON.stringify(this.textColors));
    this.mainImgPath = this.formData.image;
    this.wheelConfig.segment = this.dataSource.length ? this.dataSource[0].name : null;
  }

  previewImage(src: string) {
    this.selectedImage = src;
  }

  triggerDeleteImgClick(i: number) {
    this.galleryFiles.splice(i, 1);
  }

  triggerFileClick() {
    if (this.fileUploaded) {
      // this.selectedIMageIndex = imageIndex;
      let el: HTMLElement = this.fileUploaded.nativeElement;
      el.click();
    }
  }

  onFileUploaded(event: any) {
    var file = event.target.files;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        this.formData.image = fileReader.result;
        this.selectedImage = fileReader.result;
      }
    }
    fileReader.readAsDataURL(file[0]);
    this.formData.image = file[0];
  }


  uploadFile(fileToUpload: File, fileName) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
  }

  wheelResult(result: string) {
    console.log(result);
  }

  toggle(e: any, isAll: boolean, device: CodeValueModel) {
    if (isAll) {
      this.deviceList.map(x => x.value = e.checked);
    } else {
      device.value = e.checked;
      this.triggerAll.value = this.deviceList.filter(x => x.value).length == this.deviceList.length ? true : false;
    }
  }

  lightenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = (num >> 8 & 0x00FF) + amt,
      G = (num & 0x0000FF) + amt;
    return '#' + ((0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1));
  };

  apply() {
    const index: number = this.dataSource.findIndex(x => x.id == this.formData.id);
    if (index !== -1 && this.isEdit) {
      this.dataSource[index] = JSON.parse(JSON.stringify(this.formData));
      this.action = { index: index, action: ActionItems.UPDATE, param: [this.formData] };
    } else {
      const lastItem: any = this.dataSource.length ? this.dataSource[this.dataSource.length - 1] : 0;
      this.formData.id = lastItem && lastItem.id ? (parseInt(lastItem.id) + 1).toString() : '1';
      this.dataSource.push(this.formData);
      this.action = { index: this.dataSource.length - 1, action: ActionItems.ADD, param: [this.formData] };
    }
    this.dataSource = this.dataSource.filter(x => x.id);
    this.closeModel();
  }

  onDelete(model) {
    this.modalService.open(model, { size: 'md', backdrop: 'static', centered: true });
  }

  delete(id: string) {
    this.action = { index: this.dataSource.findIndex(x => x.id == id), action: ActionItems.DELETE, param: [this.formData] };
    this.dataSource = this.dataSource.filter(x => x.id !== id);
    this.closeModel();
  }

  openModel(record: WheelModel, model: any, isEdit: boolean) {
    this.isEdit = isEdit;
    this.formData = isEdit && record ? JSON.parse(JSON.stringify(record)) : new WheelModel();
    this.modalService.open(model, { size: 'md', backdrop: 'static', centered: true });
  }

  openWheel(model: any) {
    this.isMaximize = true;
    this.action = undefined;
    this.modalService.open(model, { size: 'lg', backdrop: 'static', centered: true, windowClass : "customModalClass"  });
  }

  closeModel() {
    this.isEdit = false;
    this.isMaximize = false;
    this.formData = new WheelModel();
    this.modalService.dismissAll();
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

  getMaxRepeat() {
    const count = this.dataSource.length;
    let max: number;
    switch (true) {
      case count <= 2: max = 12;
        break;
      case count <= 3: max = 8;
        break;
      case count <= 4: max = 6;
        break;
      case count <= 5: max = 5;
        break;
      case count <= 7: max = 4;
        break;
      case count <= 11: max = 3;
        break;
      case count <= 23: max = 2;
        break;
      case count >= 24: max = 1;
        break;
      default: max = 1;
        break;
    }
    return max;
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
