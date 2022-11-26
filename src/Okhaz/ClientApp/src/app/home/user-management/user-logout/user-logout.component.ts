import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  LogoutClicked() {
    localStorage.clear();
    this.auth.logout();
  }

}
