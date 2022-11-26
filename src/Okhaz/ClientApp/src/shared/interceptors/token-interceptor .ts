import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { SharedHelperService } from "@shared/services/shared-helper.service";
import { Observable } from "rxjs";
import { GlobalConstant } from "@shared/constants/App.Constants";
@Injectable({ providedIn: "root" })
export class TokenInterceptor implements HttpInterceptor {
  constructor(public sharedHelperService: SharedHelperService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(request.url.indexOf(GlobalConstant.loginRoute) > -1)) {
      const bearerToken = "Bearer " + this.sharedHelperService.getAccessToken();
      const authReq = request.clone({
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: bearerToken,
        }),
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
