import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  ngOnInit(): void {
  }

  email      : string = "";
  password   : string = "";

  constructor( public authService: AuthService) { }

  /**
    * send method is used to send a reset password link into your email.
    */
  send(value:string) {
     this.authService.resetPassword(value);
  }   

}
