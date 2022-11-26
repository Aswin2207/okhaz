import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, of, Observable } from "rxjs";
import { DatePipe } from "@angular/common";
import { ConfigService } from "./config-service";
import {
  AppDateFormatt,
  GlobalConstant,
  HttpStatusCodes,
  StorageKey,
} from "@shared/constants/App.Constants";

@Injectable({ providedIn: "root" })
export class SharedHelperService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _userName: string;

  constructor(private router: Router, private configService: ConfigService) {}

  // return the global window object
  get nativeWindow(): any {
    return window;
  }

  get userName(): string {
    return this._userName;
  }
  set userName(value: string) {
    this._userName = value;
  }
  cloneObject(data: any) {
    return JSON.stringify(data);
  }
  hasActiveToken() {
    const isValidUser = this.getAccessToken();
    return Boolean(isValidUser);
  }
  deepCloneObject(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  getObjectKeys(object: {}): string[] {
    if (!object || typeof object !== "object") {
      throw new Error(
        "Only objects can be passed to retrieve its own enumerable properties(keys)."
      );
    }
    return Object.keys(object);
  }

  searchInArray(inputArray, lookUpArray): any[] {
    const result: any[] = [];
    outer: for (let index = 0; index < inputArray.length; index++) {
      const item = inputArray[index];
      for (let i = 0; i < lookUpArray.length; i++) {
        const lookUpItem = lookUpArray[i];
        if (item[lookUpItem.key] !== lookUpItem.value) {
          continue outer;
        }
      }
      result.push(item);
    }
    return result;
  }

  redirectToURL(url: string) {
    this.router.navigate([url]);
  }

  setAccessToken(token: string) {
    this.setLocalStorage(GlobalConstant.accessToken, token);
  }

  getAccessToken(): string {
    return this.getLocalStorage(GlobalConstant.accessToken);
  }

  getBookingStatus(): string[] {
    const bookingStatusList: string[] = [
      "Initiated",
      "InProgress",
      "cancelled",
      "completed",
    ];
    return bookingStatusList;
  }
  getApiDomainName(): string[] {
    const domainName = [];
    const apiDomainPattern = /http:\/\/(.+?)\/.*?/i;
    const matches =
      this.configService?.configuration?.apiBaseUrl.match(apiDomainPattern);
    const regexMatchCount = 2;
    if (matches.length === regexMatchCount) {
      domainName.push(matches[1]);
    }
    return domainName;
  }
  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  get loggedInAsDoctor(): boolean {
    const isDoctor =
      this.getLocalStorage(StorageKey.UserRole)?.toLowerCase() === "doctor";
    return isDoctor;
  }
  getLocalStorage(key: string): string {
    const storageItem = localStorage.getItem(key);
    return storageItem || "";
  }

  clearLocalStorage() {
    localStorage.removeItem(StorageKey.UserRole);
    localStorage.removeItem(StorageKey.UserMenu);
    localStorage.removeItem(StorageKey.UserId);
    localStorage.removeItem(StorageKey.UserName);
    localStorage.removeItem(StorageKey.GeneralSettings);
    localStorage.removeItem(GlobalConstant.accessToken);
    this._userName = "";
  }

  isValidEmail(email): boolean {
    return true;
    // return AppConstants.emailRegularExpression.test(String(email).toLowerCase());
  }
  catchHttpError(error, defaultValue): Observable<any> {
    let message = "";
    if (error.status && error.status === HttpStatusCodes.NotFound) {
      message = defaultValue;
    } else {
      const defaultError =
        "Error while processing your request, please try again later.";
      message =
        error.error && error.error.message ? error.error.message : defaultError;
    }
    // this.snackBarService.errorNotification("", message);
    return of({});
  }
  displayHttpError(error, defaultValue): void {
    let message = "";
    if (error.status && error.status === HttpStatusCodes.NotFound) {
      message = defaultValue;
    } else {
      const defaultError =
        "Error while processing your request, please try again later.";
      message =
        error.error && error.error.message ? error.error.message : defaultError;
    }
    // this.snackBarService.errorNotification("", message);
  }
  getGenderList(): string[] {
    return ["Male", "Female", "Transgender"];
  }
  getPatientTypes(): string[] {
    return ["IN", "OUT"];
  }
  parseDate(dateValue: any) {
    if (!dateValue) {
      return null;
    }
    const datePipe = new DatePipe("en-Us");
    return datePipe.transform(dateValue, AppDateFormatt.EST);
  }
}
