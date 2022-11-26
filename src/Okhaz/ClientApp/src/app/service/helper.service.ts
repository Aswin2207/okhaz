import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Input } from '../models/input.model';
import { TosterComponent } from '../shared/toster/toster.component';

@Injectable({
  providedIn: 'root'
})

export class HelperService {
  loader:any;
  Logout() {
      localStorage.clear();
      this.route.navigate(['/session/login']);
  }

  stopWorkProgressBar() {
    this.loader.complete();
  }

  startWorkProgressBar() {
      this.loader.start();
  }


  AddToLocalStorage(data: any, name: string) {
    localStorage.setItem(name, data);
  }


  getDataFromStorageDetails(name: string): any {
    return localStorage.getItem(name);
  }

  getDataJsonMapped(data: Input[],json:any) : any{
    for(var i=0;i<data.length;i++)
    {
      if (data[i].fieldId) {
        json[data[i].fieldId] = data[i].fieldValue;
      }
    }
  }

  MapDataToModel(model: Input[], data: any): any {
    if (data) {
      for (var i = 0; i < model.length; i++) {
        model[i].fieldValue = data[model[i].fieldId];
      }
    }
  }


  uuidv4() {
    return 'xxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  isFormValid(data:any[]){
    var valid = true
    for(var i=0;i<data.length;i++){
        if(data[i].required){
          data[i].isValid = true;
          switch(data[i].type){
            case 'email':
              var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
              valid = regexp.test(data[i].fieldValue);
              data[i].isValid = valid;
              break;
            case 'number':
              if(isNaN(parseFloat(data[i].fieldValue))){
                valid = false;
                data[i].isValid = false;
              }
              break;
            case 'text':case 'password':default:
              if(!data[i].fieldValue || !(data[i].fieldValue+"").trim()){
                valid = false;
                data[i].isValid = false;
              }
              break;
          }
          
        }
    }
    return valid;
  }

  showErrorTostMessage(message:string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass:"error"
    });
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  showSuccessTostMessage(message:string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass:"success"
    });
  }

  constructor(private route:Router,private loadingBar: LoadingBarService,private _snackBar: MatSnackBar) {
    this.loader = this.loadingBar.useRef();
   }
}
