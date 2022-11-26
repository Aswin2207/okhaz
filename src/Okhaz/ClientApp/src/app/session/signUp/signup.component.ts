import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   fname: string = "";
   lname: string = "";
	email: string = "";
	password: string = "";
   passwordConfirm : string = "";
   store_name: string = "";
   phone_number: string = "";
   infosec:number =1;
  constructor(private authService:AuthService) { }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"autoplay": true, "autoplaySpeed": 1000,"dots":false,"arrows":false};

  sessionSlider : any [] = [
     {
        image : "assets/img/login-slider1.jpg",
        name  : "Francisco Abbott",
        designation : "CEO-Gene",
        content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
     },
     {
        image : "assets/img/login-slider2.jpg",
        name  : "Samona Brown",
        designation : "Designer",
        content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
     },
     {
        image : "assets/img/login-slider3.jpg",
        name  : "Anna Smith",
        designation : "Managing Director",
        content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
     }
  ]
  
  ngOnInit(): void {
  }

  register() {
		this.authService.signupUserProfile('');
	}

}
