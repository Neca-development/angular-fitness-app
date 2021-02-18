import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [SessionService],
})
export class AuthComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  hide: boolean = true;
  login: string;
  password: string;

  ngOnInit(): void {
    const token = localStorage.getItem('token') || false;
    if (token) this.detectUser(jwtDecode(token));
  }
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  async logIn() {
    const user = {
      login: this.login,
      password: this.password,
    };
    try {
      let userData = await this.sessionService.logIn(user);
      await this.detectUser(userData);
    } catch (e) {
      this.openSnackBar('Логин или пароль не подходят', 'ошибка');
    }
  }
}
