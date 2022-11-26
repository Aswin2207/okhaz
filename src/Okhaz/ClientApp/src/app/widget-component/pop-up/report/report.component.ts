import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppconstantsService } from "app/service/core/appconstants.service";
import { HttpUtilityService } from "app/service/core/httputility.service";

@Component({
  selector: "ms-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit {
  reportType = [
    {
      value: 1,
      label: "Branch",
      api: AppconstantsService.reportsAPI.OnlineSalesReportByBranch,
    },
    {
      value: 2,
      label: "Supplier",
      api: AppconstantsService.reportsAPI.OnlineSalesReportBySuppID,
    },
    {
      value: 3,
      label: "Delivery Man",
      api: AppconstantsService.reportsAPI.OnlineSalesReportByDeliverManID,
    },
    {
      value: 4,
      label: "Customer Sale",
      api: AppconstantsService.reportsAPI.OnlineSalesReportByCustomerSale,
    },
    {
      value: 5,
      label: "Product Count",
      api: AppconstantsService.reportsAPI.OnlineSalesReportByProductCount,
    },
  ];
  selectedReportType = 1;
  fromDate = new Date();
  toDate = new Date();
  todayDate = new Date();
  supplierID = "";
  deliveryManId = "";
  deliveryManList = [];
  supplierList = [];

  reportFields: any[] = [
    {
      fieldId: "status",
      label: "Suppliers",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList,
    },
    {
      fieldId: "delivery",
      label: "Delivery Men",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: AppconstantsService.countryList,
    },
    {
      fieldId: "reportBy",
      label: "Order Sales Report By",
      fieldValue: this.reportType[0].value,
      type: "select",
      isValid: true,
      errorMesg: "",
      required: true,
      options: this.reportType,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<ReportComponent>,
    public http: HttpUtilityService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.getDeliveryManList();
    this.getSupplierList();
  }

  onCancel(): void {
    this.dialogRef.close({ action: "cancel" });
  }

  onConfirm(): void {
    console.log(this.fromDate);
    console.log(this.toDate);
    var reportType: any = this.reportType.filter(
      (item) => item.value === this.selectedReportType
    )[0];
    reportType.api = reportType.api.replace("{FromDate}", this.fromDate);
    reportType.api = reportType.api.replace("{ToDate}", this.toDate);
    if (reportType.value == 2) {
      reportType.api = reportType.api.replace("{SupplierID}", this.supplierID);
    }
    if (reportType.value == 3) {
      reportType.api = reportType.api.replace(
        "{DeliveryManID}",
        this.deliveryManId
      );
    }
    this.dialogRef.close({
      action: "confirm",
      api: reportType.api,
      type: reportType.label,
    });
  }

  getDeliveryManList() {
    this.http
      .get(AppconstantsService.OrderAPIS.GetDeliveryManList)
      .then((data: any) => {
        data.forEach((element: any) => {
          this.deliveryManList.push({
            value: element.id,
            label: element.userName,
          });
        });
        this.reportFields[1].options = this.deliveryManList;
      });
  }

  getSupplierList() {
    this.http
      .get(AppconstantsService.UsersAPIS.GetSupplierDetailsbybranchCode)
      .then((data: any) => {
        data.forEach((element: any) => {
          this.supplierList.push({
            value: element.suppID,
            label: element.suppName,
          });
        });
        this.reportFields[0].options = this.supplierList;
      });
  }

  onSupplierChange(e: any) {
    var supplier = this.supplierList.filter((item) => item.value === e)[0];
    this.supplierID = supplier.value;
  }

  onDeliveryManChange(e: any) {
    var deliveryMan = this.deliveryManList.filter(
      (item) => item.value === e
    )[0];
    this.deliveryManId = deliveryMan.value;
  }

  onReportTypeChange(e: any) {
    var reportType = this.reportType.filter((item) => item.value === e)[0];
    this.selectedReportType = reportType.value;
  }
}
