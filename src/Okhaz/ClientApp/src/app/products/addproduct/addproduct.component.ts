import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Input } from "../../models/input.model";
import { AppconstantsService } from "../../service/core/appconstants.service";
import { HelperService } from "../../service/core/helper.service";
import { HttpUtilityService } from "../../service/core/httputility.service";

@Component({
  selector: "app-addproduct",
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.scss"],
})
export class AddProductComponent implements OnInit {
  @ViewChild("fileToUpload") fileUploaded?: ElementRef<HTMLElement>;
  selectedIMageIndex: number = 0;
  productDetails: Input[] = [];
  brandField: any = {};
  brands: any = [];
  selectedImage: any = "http://via.placeholder.com/625x800";
  description: any = {};

  setInputFields() {
    this.productDetails = [
      {
        fieldId: "itemName",
        label: "Product Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product name",
        required: true,
      },
      {
        fieldId: "itemCost",
        label: "Price",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide product price",
        required: true,
      },
      {
        fieldId: "itemUnit",
        label: "Item Quantity",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide available item units",
        required: true,
      },
      {
        fieldId: "batchNo",
        label: "Product Code",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product code",
        required: true,
      },
      {
        fieldId: "wheight",
        label: "Weight(KGS) *",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide product weight",
        required: true,
      },
      {
        fieldId: "Barcode",
        label: "Barcode*",
        fieldValue: "",
        type: "string",
        isValid: true,
        errorMesg: "Please provide product barcore",
        required: true,
      },
    ];
    (this.brandField = {
      fieldId: "Brand",
      label: "Brand",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide product description",
      required: false,
      options: this.brands,
    }),
      (this.description = {
        fieldId: "ItemDesc1",
        label: "Description",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product description",
        required: true,
      });
  }

  constructor(
    public http: HttpUtilityService,
    private helper: HelperService,
    private httpc: HttpClient
  ) {
    this.getBrands();
    this.setInputFields();
  }

  getBrands() {
    this.http.post(AppconstantsService.BrandInfo.brandList, {}).then(
      (data) => {
        if (data) {
          for (var i = 0; i < data.rows.length; i++) {
            this.brands.push({
              value: data.rows[i].BrandId,
              label: data.rows[i].BrandName,
            });
          }
        }
      },
      (error) => {}
    );
  }

  mainImgPath: string = "";
  colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
  sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
  quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public imagePath: any;
  mainImage?: File;
  galleryFiles: File[] = [];
  imageData: any = [
    {
      image: "http://via.placeholder.com/625x800",
      image_gallery: [
        "http://via.placeholder.com/625x800",
        "http://via.placeholder.com/625x800",
        "http://via.placeholder.com/625x800",
        "http://via.placeholder.com/625x800",
        "http://via.placeholder.com/625x800",
      ],
    },
  ];

  previewImage(src: string) {
    this.selectedImage = src;
  }

  ngOnInit(): void {
    this.mainImgPath = this.imageData[0].image;
  }

  triggerDeleteImgClick(i: number) {
    this.galleryFiles.splice(i, 1);
  }

  triggerFileClick(imageIndex: number) {
    if (this.fileUploaded) {
      this.selectedIMageIndex = imageIndex;
      let el: HTMLElement = this.fileUploaded.nativeElement;
      el.click();
    }
  }

  onFileUploaded(event: any) {
    var file = event.target.files;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        if (this.selectedIMageIndex >= 0) {
          this.imageData[0].image_gallery[this.selectedIMageIndex] =
            fileReader.result;
          this.selectedImage = fileReader.result;
        } else {
          this.mainImgPath = fileReader.result.toString();
        }
      }
    };
    fileReader.readAsDataURL(file[0]);
    if (this.selectedIMageIndex >= 0) {
      this.galleryFiles[this.selectedIMageIndex] = file[0];
    } else {
      this.mainImage = file[0];
    }
  }

  uploadFile(fileToUpload: File, fileName) {
    const formData: FormData = new FormData();
    formData.append("Image", fileToUpload, fileToUpload.name);
    this.httpc
      .post("api/upload/PostFormData/" + fileName, formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {});
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.productDetails)) {
      var data = this.helper.getDataFromStorageDetails("BranchInfo");
      var branchInfo;
      if (data) {
        data = JSON.parse(data);
        branchInfo = data.BranchInfo;
      }
      var json: any = {};
      this.helper.getDataJsonMapped(this.productDetails, json);
      json.ItemDesc1 = this.description.fieldValue;
      json.Brand = this.brandField.fieldValue;
      var imagesUrls = [];
      for (var i = 0; i < this.galleryFiles.length; i++) {
        if (this.galleryFiles[i]) {
          var filename =
            this.helper.uuidv4() +
            "_" +
            this.galleryFiles[i].name.replace(/ /g, "").toUpperCase();
          imagesUrls.push(branchInfo.OnlineBannerHttpPath + "/" + filename);
          this.uploadFile(this.galleryFiles[i], filename);
        }
        if (this.mainImage) {
          this.mainImage.name;
          var filename =
            this.helper.uuidv4() +
            "_" +
            this.galleryFiles[i].name.replace(/ /g, "").toUpperCase();
          json.image_url = branchInfo.OnlineBannerHttpPath + "/" + filename;
          this.uploadFile(this.mainImage, filename);
        }
      }
      var datatoSend = {
        item: json,
        extraImageUrls: [],
        test: "123",
      };

      this.http
        .post(AppconstantsService.ProductAPIs.addProductApi, datatoSend)
        .then(
          (data) => {
            if (data == "success") {
              this.helper.showSuccessTostMessage("Added product successfully");
              this.setInputFields();
            }
          },
          (error) => {
            this.helper.showErrorTostMessage(error);
          }
        );
    } else {
      this.helper.showErrorTostMessage("Please fill all required fields");
    }
  }

  DeleteClicked() {}
}
