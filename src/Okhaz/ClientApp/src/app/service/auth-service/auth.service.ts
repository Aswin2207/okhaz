import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpUtilityService } from '../core/httputility.service';
import { HelperService } from '../core/helper.service';
import { AppconstantsService } from '../core/appconstants.service';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   user: Observable<firebase.User>;
   userData: any;
   isLoggedIn = false;

   constructor(private firebaseAuth: AngularFireAuth,
      private httpUtility: HttpUtilityService, private helper: HelperService, private router: Router,
      private toastr: ToastrService) {
      this.user = firebaseAuth.authState;
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   getLocalStorageUser() {
      this.userData = JSON.parse(localStorage.getItem("BranchInfo"));
      if (this.userData) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }
   }

   /*
* signupUserProfile method save email and password into firabse &
* signupUserProfile method save the user sign in data into local storage.
*/
   // signupUserProfile(value) {
   //  	this.firebaseAuth
   //    .createUserWithEmailAndPassword(value.email, value.password)
   //    .then(value => {
   //      this.toastr.success('Successfully Signed Up!');
   //      this.setLocalUserProfile(value);
   //      this.router.navigate(['/']);
   //    })
   //    .catch(err => {
   //       this.toastr.error(err.message);
   //    });
   // }

   /*
    * loginUser fuction used to login
    */
   // loginUser(value) {
   //    this.firebaseAuth
   //    .signInWithEmailAndPassword(value.email,value.password)
   //    .then(value => {
   //       this.setLocalUserProfile(value);
   //       this.toastr.success('Successfully Logged In!');
   //       this.router.navigate(['/']);
   //    })
   //    .catch(err => {
   //       this.toastr.error(err.message);
   //    });
   // }

   /*
    * resetPassword is used to reset your password
    */
   // resetPassword(value) {
   //    this.firebaseAuth.sendPasswordResetEmail(value.email)
   //       .then(value => {
   //        	this.toastr.success("A password reset link has been sent to this email.");
   //        	this.router.navigate(['/session/login']);
   //       })
   //       .catch(err => {
   //          this.toastr.error(err.message);
   //       });
   // }


   /*
    * resetPasswordV2 is used to reset your password
    */
   resetPasswordV2(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
            this.toastr.success("A password reset link has been sent to this email.");
            this.router.navigate(['/session/login']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }

   /*
    * logOut function is used to sign out
    */
   logOut() {
      this.firebaseAuth
         .signOut();
      localStorage.removeItem("BranchInfo");
      this.isLoggedIn = false;
      this.toastr.success("Successfully logged out!");
      this.router.navigate(['/session/login']);
   }

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */
   setLocalUserProfile(value) {
      localStorage.setItem("BranchInfo", JSON.stringify(value));
      this.getLocalStorageUser();
      this.isLoggedIn = true;
   }

   isValidSession(email: string, password: string) {
      return this.httpUtility.get(AppconstantsService.SessionAPIs.version);
   }


   signupUserProfile(data: any) {
      return this.httpUtility.post(AppconstantsService.SessionAPIs.register, data);
   }

   resetPassword(email: string) {
      var data = {
         userName: btoa(email)
      };
      return this.httpUtility.post(AppconstantsService.SessionAPIs.resetPassword, data);
   }

   loginUser(value: any): Promise<any> {
      var data = {
         UserName: btoa(value.email),
         Password: btoa(value.password),
      };
      return this.httpUtility.post(AppconstantsService.SessionAPIs.loginAPI, data);
   }

   logout() {
      localStorage.clear();
      this.helper.Logout();
      this.router.navigate(["/session/login"]);
      return this.httpUtility.delete(AppconstantsService.SessionAPIs.logOut);
   }
}
