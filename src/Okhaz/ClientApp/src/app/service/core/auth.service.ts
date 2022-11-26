import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppconstantsService } from './appconstants.service';
import { HelperService } from './helper.service';
import { HttpUtilityService } from './httputility.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private httpUtility: HttpUtilityService, private helper: HelperService, private router: Router) { }


  isValidSession(email: string, password: string) {
    return this.httpUtility.get(AppconstantsService.SessionAPIs.version);
  }


  signupUserProfile(data: any) {
    return this.httpUtility.post(AppconstantsService.SessionAPIs.register,data);
  }

  resetPassword(email: string) {
    var data = {
      userName:btoa(email)
    };
    return this.httpUtility.post(AppconstantsService.SessionAPIs.resetPassword,data);
  }

  loginUser(email:string,password:string):Promise<any>{
      var data = {
        UserName:btoa(email),
        Password:btoa(password),
      };
      return this.httpUtility.post(AppconstantsService.SessionAPIs.loginAPI,data);
  }

  logout() {
    localStorage.clear();
    return this.httpUtility.delete(AppconstantsService.SessionAPIs.logOut);
    this.helper.Logout();
    this.router.navigate(["/session/login"]);
  }

}
