import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridModel } from 'src/app/models/grid.model';
import { Input } from 'src/app/models/input.model';
import { AppconstantsService } from 'src/app/service/appconstants.service';
import { HelperService } from 'src/app/service/helper.service';
import { HttpUtilityService } from 'src/app/service/httputility.service';
import { environment } from 'src/environments/environment';
import { QuillModule } from 'ngx-quill'
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss']
})
export class AddProductDetailsComponent implements OnInit {

  @ViewChild('fileToUpload') fileUploaded?: ElementRef<HTMLElement>;
  constructor(private http: HttpUtilityService, private modalService: NgbModal, private helper: HelperService, private elRef: ElementRef, private httpc: HttpClient) { this.getBrands(); this.setInputFields(); }
  selectedIndex: number = 0;
  selectedTab: string = "basicInfo";
  VariantsList: any = [];
  VariantTable: GridModel = {
    EnableSearch: false,
    enablePagination: false,
    tableHeader: '',
    columns: [] = [
      {
        name: 'Option Name',
        type: 'string',
        id: 'Name'
      },
      {
        name: 'Type',
        type: 'string',
        id: 'Type'
      },
      {
        name: 'Values',
        type: 'string',
        id: 'Values',
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1
  };
  brands: any = [];
  ProductVariantTable: GridModel = {
    EnableSearch: false,
    enablePagination: false,
    tableHeader: 'Variants',
    columns: [] = [
      {
        name: 'Purchasable',
        type: 'checkbox',
        id: 'purchasable'
      },
      {
        name: 'Image',
        type: 'input',
        subType: 'file',
        id: 'image',
        editable: true
      },
      {
        name: 'Variant',
        type: 'string',
        subType: 'text',
        id: 'Values',
        editable: false
      },
      {
        name: 'SKU',
        type: 'input',
        subType: 'text',
        id: 'SKU',
        editable: true
      },
      {
        name: 'Default Price',
        type: 'input',
        subType: 'number',
        id: 'defaultPrice',
        editable: true
      },
      {
        name: 'Sale Price',
        type: 'input',
        subType: 'number',
        id: 'salePrice',
        editable: true
      },
      {
        name: 'MSRP',
        type: 'input',
        subType: 'text',
        id: 'msrp',
        editable: true
      },
      {
        name: 'Weight(KGS)',
        type: 'input',
        subType: 'number',
        id: 'weight',
        editable: true
      },
      {
        name: 'Width(Centimeters)',
        type: 'input',
        subType: 'number',
        id: 'width',
        editable: true
      },
      {
        name: 'Height(Centimeters)',
        type: 'input',
        subType: 'number',
        id: 'height',
        editable: true
      },
      {
        name: 'Depth(Centimeters)',
        type: 'input',
        subType: 'number',
        id: 'depth',
        editable: true
      },
      {
        name: 'Cost',
        type: 'input',
        subType: 'number',
        id: 'cost',
        editable: true
      },
      {
        name: ' UPC / EAN',
        type: 'input',
        subType: 'text',
        id: 'upc-ean',
        editable: true
      },
      {
        name: 'Bin Picking Number',
        type: 'input',
        subType: 'text',
        id: 'binPickingNumber',
        editable: true
      },
      {
        name: 'MPN',
        type: 'input',
        subType: 'text',
        id: 'mpn',
        editable: true
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1
  };

  ImageTableConfig: GridModel = {
    EnableSearch: false,
    tableHeader: 'Images',
    columns: [] = [
      {
        name: 'Checkbox',
        type: 'checkbox',
        id: 'checkbox'
      },
      {
        name: 'Image',
        type: 'image',
        id: 'image_url'
      },
      {
        name: 'Description (Image alt text)',
        type: 'input',
        id: 'image_alt',
      },
      {
        name: 'Thumbnail(Default Image)',
        type: 'checkbox',
        id: 'thumbnail',
      },
      {
        name: '',
        type: 'action',
        id: 'action',
      },
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: 'CreatedDate',
    sortOrder: 1,
    enablePagination:false
  };

  discountTireTableConfig: GridModel = {
    EnableSearch: false,
    tableHeader: '',
    data: [],
    currentPageSize: 20,
    tableToolbar: false,
    totalRows: 0,
    sortCol: '',
    sortOrder: 1,
    enablePagination: false,
    columns: [
      {
        name: 'Min Quantity',
        type: 'input',
        subType: 'number',
        id: 'min_quantity',
        editable: true
      },
      {
        name: '',
        type: 'input',
        subType: 'number',
        id: 'offvalue',
        editable: true
      },
      {
        name: 'Thumbnail(Default Image)',
        type: 'input',
        subType: 'number',
        id: 'unit_price',
        editable: true
      },
      {
        name: '',
        type: 'action',
        id: 'action',
      },
    ]
  };

  ProductDetailsTab = [
    {
      title: 'PRODUCT INFORMATION',
      subTabs: [
        {
          title: 'Basic Information',
          link: 'basicInfo'

        },
        {
          title: 'Description',
          link: 'description'

        },
        {
          title: 'Images & Videos',
          link: 'images-videos'

        },
        {
          title: 'Product Identifiers',
          link: 'identifiers'
        },
        {
          title: 'Pricing',
          link: 'pricing'
        },
        {

          title: 'Inventory',
          link: 'inventory'
        }
      ]
    },
    {
      title: 'PRODUCT OPTIONS',
      subTabs: [
        {
          title: 'Variations',
          link: 'variations'
        },
        //{
        //  title: 'Customizations',
        //  link: 'customizations'

        //}
      ]
    },
    {
      title: 'STOREFRONT',
      subTabs: [
        {
          title: 'Storefront Details',
          link: 'storefront'

        },
        {
          title: 'Custom Fields',
          link: 'customFields'

        },
        {
          title: 'Related Products',
          link: 'relatedProducts'

        }
      ]
    },
    {
      title: 'FULFILLMENT',
      subTabs: [
        {
          title: 'Dimensions & Weight',
          link: 'fulfillment'

        },
        {
          title: 'Shipping Details',
          link: 'shippingDetails'

        },
        {
          title: 'Purchasability',
          link: 'purchasability'

        },
        {
          title: 'Gift Wrapping',
          link: 'giftWrapping'

        },
        {
          title: 'Customs Information',
          link: 'customInfo'

        }
      ]
    },
    {
      title: 'SEO & SHARING',
      subTabs: [
        {
          title: 'SEO',
          link: 'searchOpt'

        },
        {
          title: '	Open Graph Sharing',
          link: 'openGraphSharing'

        },
        // {
        //   title: 'Related Products',
        //   link: ''

        // }
      ]
    },
  ];

  editor: {} = {
    fieldValue: ''
  }

  name = 'Angular';
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['formula'],
      ['image', 'code-block']
    ]
  };

  logChange($event) {
    console.log(this.editor);
    console.log($event);
  }
  showVariantsOption: boolean = false

  productImageUrl: Input = {
    fieldId: "itemName",
    label: "Url",
    fieldValue: "",
    type: "text",
    isValid: true,
    errorMesg: "Please provide image url",
    required: true
  };

  productDetails: any[] = [];

  addVariants() {
    this.showVariantsOption = true;
  }

  setInputFields() {
    this.productDetails = [
      {//1
        fieldId: "itemName",
        label: "Product Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product name",
        required: true
      },
      {//2
        fieldId: "batchNo",
        label: "SKU",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide product code",
        required: true
      },
      {//3
        fieldId: "itemType",
        label: "Product Type",
        fieldValue: "",
        type: "select",
        isValid: true,
        errorMesg: "Please provide available item units",
        required: false,
        options: [
          { value: 'physical', label: 'Physical' },
          { value: 'digital', label: 'Digital' },
        ]
      },
      {//4
        fieldId: "itemCost",
        label: "Default Price In AED(excluding tax)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide product price",
        required: true
      },
      {//5
        fieldId: "Brand",
        label: "Brand",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide product description",
        required: false,
        options: this.brands
      },
      {//6
        fieldId: "wheight",
        label: "Weight(KGS)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide product weight",
        required: true
      },
      {//7
        fieldId: "ItemDesc1",
        label: "Description",
        styleClass: "",
        type: "text",
        required: false,
        iconClass: '',
        value: "",
        rows: "2",
        cols: "3",
        isValid: true,
        errorMesg: "Please provide product description",
      },
      {//8
        fieldId: "sku",
        label: "SKU",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//9
        fieldId: "manufacturePartNumber",
        label: "Manufacturer Part Number (MPN)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//10
        fieldId: "productUPCorEAN",
        label: "Product UPC/EAN",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//11
        fieldId: "globalTradeNo",
        label: "Global Trade Number (GTN)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//12
        fieldId: "binPickingNo",
        label: "Bin Picking Number (BPN)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//13
        fieldId: "price",
        label: "Default Price (excluding tax)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//14
        fieldId: "taxClass",
        label: "Tax Class",
        fieldValue: "",
        type: "select",
        isValid: true,
        errorMesg: "",
        required: false,
        options: [
          { label: 'Default Tax Class', value: 'defaulttax' },
          { label: 'Non-Taxable Products', value: 'notaxproduct' },
          { label: 'Shipping', value: 'shpping' },
          { label: 'Gift Wrapping', value: 'giftwarpping' },
        ]
      },
      {//15
        fieldId: "taxCode",
        label: "Tax Provider Tax Code ",
        fieldValue: "",
        type: "string",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//16
        fieldId: "itemSellingprice",
        label: "Cost",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//17
        fieldId: "MSRP",
        label: "MSRP",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//18
        fieldId: "itemSellingprice",
        label: "Sale Price",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//19
        fieldId: "discountType",
        label: "Discount Type",
        fieldValue: "",
        type: "select",
        isValid: true,
        errorMesg: "",
        required: false,
        options: [
          {
            value: 'Percentage off on total order',
            label: '% Discount'
          },
          {
            value: 'Fixed Amount off on total order',
            label: 'AED Fixed Amount'
          },
          {
            value: 'Off Per Unit',
            label: 'AED Off/Unit'
          }
        ]
      },
      {//20
        fieldId: "trackInventory",
        label: "Track inventory",
        fieldValue: false,
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false
      },
      {//21
        fieldId: "StockingType",
        label: "",
        fieldValue: true,
        type: "radio",
        isValid: true,
        errorMesg: "",
        required: false,
        group: 'inventorytracking',
        options: [
          {
            value: 'Stock',
            label: "On the product level"
          },
          {
            value: 'Variant',
            label: "On the variant level"
          },
        ]
      },
      {//22

      },
      {//23
        fieldId: "productStock",
        label: "Stock",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//24
        fieldId: "productLowStock",
        label: "Low Stock",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//25
        fieldId: "SearchKeywords",
        label: "Search Keywords",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//26
        fieldId: "SortOrder",
        label: "Sort order",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//27
        fieldId: "TemplateLayoutFile",
        label: "Template Layout File",
        fieldValue: "",
        type: "select",
        isValid: true,
        errorMesg: "",
        required: false,
        options: []
      },
      {//28
        fieldId: "WarrantyInformation",
        label: "Warranty Information",
        fieldValue: "",
        type: "textarea",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//29
        fieldId: "AvailabilityText",
        label: "Availability Text",
        fieldValue: "",
        type: "textarea",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//30
        fieldId: "Condition",
        label: "Condition",
        fieldValue: "",
        type: "select",
        isValid: true,
        errorMesg: "",
        required: false,
        options: [
          {
            value: 'new',
            label: 'New'
          },
          {
            value: 'used',
            label: 'Used'
          },
          {
            value: 'refurbished',
            label: 'Refurbished'
          }
        ]
      },
      {//31
        fieldId: "showcondition",
        label: "Show condition on storefront",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//32
        fieldId: "productWeight",
        label: "Weight(KGS)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//33
        fieldId: "width",
        label: "Width (Centimeters)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//34
        fieldId: "height",
        label: "Height (Centimeters)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//35
        fieldId: "depth",
        label: "Depth (Centimeters)",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//36
        fieldId: "fixedShippingPrice",
        label: "Fixed Shipping Price",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//37
        fieldId: "FreeShipping",
        label: "Free Shipping",
        fieldValue: "",
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//38
        fieldId: "purchasability",
        label: "This product can be purchased in my online store",
        fieldValue: "online",
        type: "radio",
        isValid: true,
        errorMesg: "",
        required: false,
        group: 'purchasability',
        options: [
          {
            value: 'online',
            label: 'This product can be purchased in my online store'
          },
          {
            value: 'pre-order',
            label: 'This product is coming soon but I want to take pre-orders'
          },
          {
            value: 'offline',
            label: 'This product cannot be purchased in my online store'
          },
        ]
      },
      {//39
        fieldId: "minimumPurchaseQuantity",
        label: "Minimum Purchase Quantity",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//40
        fieldId: "maxPurchaseQuantity",
        label: "Maximum Purchase Quantity",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//41
        fieldId: "message",
        label: "Message",
        fieldValue: "Expected release date is %%DATE%%",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//42
        fieldId: "releaseDate",
        label: "Release Date",
        fieldValue: "",
        type: "date",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//43
        fieldId: "removeNotification",
        label: "Remove pre-order status on this date",
        fieldValue: "",
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//44
        fieldId: "pricingLabel",
        label: "Call for pricing label",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//45
        fieldId: "giftWrapping",
        label: "",
        fieldValue: "0",
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
        group: 'giftWrapping',
        options: [
          {
            value: 0,
            label: "Use all visible gift wrapping options I've created"
          },
          {
            value: 1,
            label: "Don't allow this item to be gift wrapped"
          },
        ]
      },
      {//46
        fieldId: "managecustoms",
        label: "Manage customs information",
        fieldValue: "",
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//47
        fieldId: "pageTitle",
        label: "Page Title",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//48
        fieldId: "productUrl",
        label: "Product URL",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//49
        fieldId: "metaDesc",
        label: "Meta Description",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//50
        fieldId: "metaDesc",
        label: "Object Type",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
        options: [
          {
            value: 'new',
            label: 'Album'
          },
          {
            value: 'used',
            label: 'Book'
          },
          {
            value: 'drink',
            label: 'Drink'
          },
          {
            value: 'food',
            label: 'Food'
          },
          {
            value: 'game',
            label: 'Game'
          },
          {
            value: 'product',
            label: 'Product'
          },
          {
            value: 'song',
            label: 'Song'
          },
          {
            value: 'tvShow',
            label: 'TV Show'
          }
        ]
      },
      {//51
        fieldId: "",
        label: "Use Product Name",
        fieldValue: "",
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//52
        fieldId: "useProductName",
        label: "",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//53
        fieldId: "",
        label: "Use meta description",
        fieldValue: "",
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//54
        fieldId: "useMetaDesc",
        label: "",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//55
        fieldId: "image",
        label: "",
        fieldValue: "",
        type: "radio",
        isValid: true,
        errorMesg: "",
        required: false,
        group: 'image',
        options: [
          {
            value: 0,
            label: "Use thumbnail image"
          },
          {
            value: 1,
            label: "Don’t use an image"
          },
        ]
      },
      {//56
        fieldId: "featuredProduct",
        label: " Set as a Featured Product on my Storefront",
        fieldValue: false,
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {//57
        fieldId: "ItemDesc1",
        label: " Desciption",
        fieldValue: false,
        type: "checkbox",
        isValid: true,
        errorMesg: "",
        required: false,
      },
    ];
    this.customFields = [
      {
        fieldId: "customFieldName1",
        label: "Custom Field Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      },
      {
        fieldId: "customFieldValue1",
        label: "Custom Field Value",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      }
    ];
    this.VariantsList = [];
    this.VariantTable.data = [];
    this.ProductVariantTable.data = [];
  }

  getBrands() {
    this.http.post(AppconstantsService.BrandInfo.brandList, {}).then((data) => {
      if (data) {
        for (var i = 0; i < data.rows.length; i++) {
          this.brands.push({ value: data.rows[i].BrandId, label: data.rows[i].BrandName },);
        }
      }
    }, (error) => { })
  }

  customFields: any[] = []

  removeField(index: number) {
    this.customFields.splice(index, 2);
  }

  radioChange(val: string) {
    console.log(val);
  }

  savedVariants(variants: any) {
    this.showVariantsOption = false;
    this.VariantTable.data = [];
    this.ProductVariantTable.data = [];
    for (var i = 0; i < variants.length; i++) {
      this.VariantTable.data.push({
        Name: variants[i].Name,
        Type: variants[i].Type,
        Values: variants[i].Values.join(", ")
      });
      for (var j = 0; j < variants[i].Values.length; j++) {
        this.ProductVariantTable.data.push({
          Name: variants[i].Name,
          Type: variants[i].Type,
          Values: variants[i].Values[j]
        });
      }
    }
    this.VariantsList = variants;
  }

  addCustomField() {
    this.customFields.push({
      fieldId: "customFieldName" + ((this.customFields.length / 2) + 1),
      label: "Custom Field Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    });
    this.customFields.push(
      {
        fieldId: "customFieldValue" + ((this.customFields.length / 2) + 1),
        label: "Custom Field Value",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "",
        required: false,
      });
  }

  setDiscountTableHeader(selectedOffType: string) {
    this.discountTireTableConfig.columns[1].name = selectedOffType;
  };

  bulkDiscountChanged(value: string) {
    for (var i = 0; i < this.productDetails[18].options.length; i++) {
      if (value == this.productDetails[18].options[i].value) {
        this.setDiscountTableHeader(this.productDetails[18].options[i].label);
        break;
      }
    }
  }

  addTireEmptyRow() {
    var val;
    for (var i = 0; i < this.productDetails[18].options.length; i++) {
      if (this.productDetails[18].fieldValue == this.productDetails[18].options[i].value) {
        switch (this.productDetails[18].fieldValue) {
          case 'Percentage off on total order':
            val = '0.00%'
            break;
          case 'Fixed Amount off on total order': case 'Off Per Unit':
            val = 'AED0.00'
            break;
        }
        break;
      }
    }

    this.discountTireTableConfig?.data.push(
      {
        min_quantity: this.discountTireTableConfig?.data.length + 1,
        offvalue: val,
        unit_price: ''
      }
    );
  }

  closeModel() {
    this.modalService.dismissAll();
  }

  AddFromUrlClicked(content: any) {
    this.modalService.open(content, { size: 'md', backdrop: 'static', centered: true });
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "deleteRow":
        this.ImageTableConfig.data.splice(e.index, 1);
        break;
    }
  }

  onAnyActionOnTire(e: any) {
    console.log(e);
    switch (e.action) {
      case "deleteRow":
        this.discountTireTableConfig.data.splice(e.index, 1);
        break;
    }
  }

  UploadImageClicked() {
    if (this.fileUploaded) {
      let el: HTMLElement = this.fileUploaded.nativeElement;
      el.click();
    }
  }

  imageFileSelected(event: any) {
    var file = event.target.files;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {

        this.ImageTableConfig.data.push({
          image_url: fileReader.result.toString(),
          image_alt: '',
          thumbnail: false,
          file: file[0]
        });

        if (this.ImageTableConfig.data.length == 1) {
          this.ImageTableConfig.data[0].thumbnail = true;
        }
      }
    }
    fileReader.readAsDataURL(file[0]);
  }

  SaveImagesClicked(src: string) {
    this.ImageTableConfig.data.push({
      image_url: src,
      image_alt: '',
      thumbnail: false,
      file: null
    });

    if (this.ImageTableConfig.data.length == 1) {
      this.ImageTableConfig.data[0].thumbnail = true;
    }
  }

  uploadFile(fileToUpload: File, fileName) {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    this.httpc.post('api/upload/PostFormData/' + fileName, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {

      });
  }

  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
    this.selectedTab = section;
  }

  ngOnInit(): void {
    this.elRef.nativeElement.addEventListener('DOMContentLoaded');
  }

  @HostListener('window:scroll') onScroll(e: Event): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        let nav: any = document.querySelector(`nav li a[href="#${id}"]`);
        if (entry.intersectionRatio > 0) {
          nav.querySelectorAll('li').classList.add('active');
        } else {
          nav.querySelectorAll('li').classList.remove('active');
        }
      });
    });
  }

  nextStep() {
    this.selectedIndex += 1;
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  onTabSelected(tabId: number) {
    this.selectedIndex = tabId;
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
      this.helper.getDataJsonMapped(this.customFields, json);
      var discountTireData = this.discountTireTableConfig.data;
      var variantsDetails = this.ProductVariantTable.data;
      json.desc = this.productDetails[6].value;
      var imagesUrls = [];

      for (var i = 0; i < this.ImageTableConfig.data.length; i++) {
        if (this.ImageTableConfig.data[i]) {
          var filename = this.helper.uuidv4() + "_" + json.itemName.replace(/ /g, '').toUpperCase();
          imagesUrls.push(branchInfo.OnlineBannerHttpPath + "/" + filename);
          this.uploadFile(this.ImageTableConfig.data[i].file, filename);
        }
      }

      if (this.productImageUrl.fieldValue) {
        imagesUrls.push(this.productImageUrl.fieldValue);
      }

      json.image_url = imagesUrls[0];

      var datatoSend = [];
      datatoSend.push({
        item: JSON.stringify(json),
        extraImageUrls: JSON.stringify(imagesUrls),
        discountTireData: JSON.stringify(discountTireData),
        test: '123'
      });

      for (var i = 0; i < variantsDetails.length; i++) {
        var imagesUrls = [];
        var filename = this.helper.uuidv4() + "_" + variantsDetails[i].itemName.replace(/ /g, '').toUpperCase();
        imagesUrls.push(branchInfo.OnlineBannerHttpPath + "/" + filename);
        json.image_url = branchInfo.OnlineBannerHttpPath + "/" + filename;
        this.uploadFile(variantsDetails[i].file, filename);
        datatoSend.push({
          item: JSON.stringify(variantsDetails[i]),
          extraImageUrls: JSON.stringify(imagesUrls),
          test: '123'
        });
      }

      console.log(datatoSend);
      this.http.post(AppconstantsService.ProductAPIs.addProductApi, datatoSend).then((data) => {
        if (data) {
          this.helper.showSuccessTostMessage("Added product successfully");
          this.setInputFields();
        }
      }, (error) => {
      });
    }
    else {
      this.helper.showErrorTostMessage("Please fill all mandatory data.");
    }
  }

  descrptionChanged(d) {
    console.log(d);
  }

  CancelClicked() {
  }

}
