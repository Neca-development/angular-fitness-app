import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [SessionService],
})
export class AuthComponent implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  hide: boolean = true;
  login: string;
  password: string;

  ngOnInit(): void {}
  detectUser(user) {
    switch (user.role) {
      case 'user':
        this.openUser(user);
        break;
      case 'admin':
        this.openAdmin(user);
        break;
      default:
        break;
    }
  }

  openUser(user) {
    let userId = user.id;
    this.router.navigate([`/user/`, userId]);
  }

  openAdmin(user) {
    let userId = user.id;
    this.router.navigate([`/admin/`, userId]);
  }

  async logIn() {
    const user = {
      login: this.login,
      password: this.password,
    };
    try {
      let userData = await this.sessionService.logIn(user);
      this.detectUser(userData);
    } catch (e) {}
  }
}
