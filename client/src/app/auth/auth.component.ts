import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import jwtDecode from 'jwt-decode';

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

  ngOnInit(): void {
    const token = localStorage.getItem('token') || false;
    if (token) this.openUser(jwtDecode(token));
  }

  openUser(user) {
    let userId = user.id;
    this.router.navigate([`/`, userId]);
  }

  async logIn() {
    const user = {
      login: this.login,
      password: this.password,
    };
    try {
      let userData = await this.sessionService.logIn(user);
      await this.openUser(userData);
    } catch (e) {
      throw e;
    }
  }
}
