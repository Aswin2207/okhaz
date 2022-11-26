import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
// import { AuthService } from '../../service/auth-service/auth.service';
import { HelperService } from "../../service/core/helper.service";
import { AuthService } from "../../service/core/auth.service";
import { SharedHelperService } from "@shared/services/shared-helper.service";

@Component({
  selector: "ms-loginV2-session",
  templateUrl: "./loginV2-component.html",
  styleUrls: ["./loginV2-component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginV2Component {
  email: string = "";
  password: string = "";
  login_error_message: string = "";
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    arrows: false,
  };

  sessionSlider: any[] = [
    {
      image: "assets/img/login-slider1.jpg",
      name: "Francisco Abbott",
      designation: "CEO-Okhaz",
      content:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
    {
      image: "assets/img/login-slider2.jpg",
      name: "Samona Brown",
      designation: "Designer",
      content:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
    {
      image: "assets/img/login-slider3.jpg",
      name: "Anna Smith",
      designation: "Managing Director",
      content:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
  ];

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private route: Router,
    private helperService: HelperService,
    private sharedHelperService: SharedHelperService
  ) {
    this.isValidSession();
  }

  // // when email and password is correct, user logged in.
  // login(value) {
  //    this.authService.loginUser(value);
  // }

  isValidSession() {
    this.authService.isValidSession(this.email, this.password).then((data) => {
      if (data) {
        this.route.navigate(["/dashboard"]);
      }
    });
  }

  // when email and password is correct, user logged in.
  login(value: string) {
    this.authService.loginUser(this.email, this.password).then((data) => {
      debugger;
      if (data) {
        if (data.IsAccountActive) {
          this.route.navigate(["/dashboard"]);
          this.sharedHelperService.setAccessToken(
            data?.UserDetails?.AccessToken
          );
          this.helperService.AddToLocalStorage(
            JSON.stringify(data),
            "BranchInfo"
          );
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
