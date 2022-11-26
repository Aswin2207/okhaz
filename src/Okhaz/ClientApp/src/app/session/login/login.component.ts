import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthService } from "../../service/auth-service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { HelperService } from "app/service/core/helper.service";

@Component({
  selector: "ms-login-session",
  templateUrl: "./login-component.html",
  styleUrls: ["./login-component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email: string = "demo@example.com";
  password: string = "0123456789";
  login_error_message: string = "";

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private helper: HelperService,
    public route: Router
  ) {}

  // when email and password is correct, user logged in.
  login(value) {
    this.authService.loginUser(value).then((data) => {
      if (data) {
        if (data.IsAccountActive) {
          this.route.navigate(["/home"]);
          this.helper.AddToLocalStorage(JSON.stringify(data), "BranchInfo");
        } else {
          this.login_error_message =
            "Account is not activated. Please activate the account";
        }
      } else {
        this.login_error_message = "Invalid Username or Password";
      }
    });
  }
}
