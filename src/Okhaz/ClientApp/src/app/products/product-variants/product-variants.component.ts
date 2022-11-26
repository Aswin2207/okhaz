import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss']
})

export class ProductVariantsComponent implements OnInit {

  constructor() { }

  @Output("save") save: EventEmitter<any> = new EventEmitter();
  @Output("cancel") cancel: EventEmitter<any> = new EventEmitter();

  @Input() set config(data) {
    for (var i = 0; i < data.length; i++) {
      if (!this.variantDetails[i]) {
        this.AddVariant();
      }
      this.variantDetails[i].variant[0].fieldValue = data[i].Name;
      this.variantDetails[i].variant[1].fieldValue = data[i].Type;
      this.variantDetails[i].variant[2].fieldValue = data[i].DefaultValIndex;
      for (var j = 0; j < data[i].Values.length; j++) {
        if (!this.variantDetails[i].valuesOpt[j]) {
          this.AddValue(this.variantDetails[i]);
        }
        this.variantDetails[i].valuesOpt[j].fieldValue = data[i].Values[j];
      }
    }
  };

  ngOnInit(): void {
  }

  variantDetails: any = [
    {
      variant: [
        {//1
          fieldId: "variantName_1",
          label: "Name",
          fieldValue: "",
          type: "text",
          isValid: true,
          errorMesg: "Please provide variant name",
          required: true
        },
        {//2
          fieldId: "type_1",
          label: "Type",
          fieldValue: "",
          type: "select",
          isValid: true,
          errorMesg: "",
          required: true,
          options: [
            // { value: 'swatch', label: 'Swatch' },
            { value: 'radioButtons', label: 'Radio Buttons' },
            { value: 'rectangleList', label: 'Rectangle List' },
            { value: 'dropdown', label: 'Dropdown' },
          ]
        },
        {//3
          fieldId: "default",
          label: "",
          fieldValue: 1,
          type: "text",
          isValid: true,
          errorMesg: "",
          required: true
        },
      ],
      defaultOptions: [
        {//1
          fieldId: "default_1",
          label: "Default",
          fieldValue: 1,
          type: "text",
          isValid: true,
          errorMesg: "Please provide variant name",
          required: true
        },
      ],
      valuesOpt: [
        {//1
          fieldId: "value_1",
          label: "Value",
          fieldValue: "",
          type: "text",
          isValid: true,
          errorMesg: "Please provide variant name",
          required: true
        },
      ]
    } 
  ]

  AddVariant() {
    this.variantDetails.push({
      variant: [
        {
          fieldId: "variantName_2",
          label: "Name",
          fieldValue: "",
          type: "text",
          isValid: true,
          errorMesg: "Please provide variant name",
          required: true
        },
        {
          fieldId: "type_2",
          label: "Type",
          fieldValue: "",
          type: "select",
          isValid: true,
          errorMesg: "",
          required: true,
          options: [
            // { value: 'swatch', label: 'Swatch' },
            { value: 'radioButtons', label: 'Radio Buttons' },
            { value: 'rectangleList', label: 'Rectangle List' },
            { value: 'dropdown', label: 'Dropdown' },
          ]
        },
        {
          fieldId: "itemName_2",
          label: "Values",
          fieldValue: "",
          type: "text",
          isValid: true,
          errorMesg: "Please provide product name",
          required: true
        }
      ],
      defaultOptions: [
        {
          fieldId: "default_2",
          label: "Value",
          fieldValue: 1,
          type: "text",
          isValid: true,
          errorMesg: "Please provide variant name",
          required: true
        },
      ],
      valuesOpt: [
        {
          fieldId: "default_2",
          label: "Value",
          fieldValue: "",
          type: "text",
          isValid: true,
          errorMesg: "Please provide variant name",
          required: true
        },
      ]
    });
  }

  DeleteVariant(index) {
    this.variantDetails.splice(index, 1);
  }

  AddValue(variant) {
    variant.valuesOpt.push({
      fieldId: "",
      label: "Value",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "Please provide variant name",
      required: true
    });
    variant.defaultOptions.push({
      fieldId: "",
      label: "Default",
      fieldValue: variant.defaultOptions.length + 1,
      type: "text",
      isValid: true,
      errorMesg: "Please provide variant name",
      required: true
    });
  }

  DeleteValue(index, variantDetails) {
    variantDetails.valuesOpt.splice(index, 1);
    variantDetails.defaultOptions.splice(index, 1);
  }

  SaveClicked() {
    var data = [];
    for (var i = 0; i < this.variantDetails.length; i++) {
      var name = this.variantDetails[i].variant[0].fieldValue;
      var type = this.variantDetails[i].variant[1].fieldValue;
      var defaultVal = this.variantDetails[i].variant[2].fieldValue;
      var values = [];
      for (var j = 0; j < this.variantDetails[i].valuesOpt.length; j++) {
        values.push(this.variantDetails[i].valuesOpt[j].fieldValue);
      }

      data.push({
        Name: name,
        Type: type,
        DefaultValIndex: defaultVal,
        Values: values
      });

    }
    this.save.emit(data);
  }

  CancelClicked() {
    this.cancel.emit();
  }
}
