import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from '../models/models';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends BaseRequestService {
  user: User;

  constructor(private router: Router) {
    super();
    const token = localStorage.getItem('token');
    if (token) this.user = jwtDecode(token);
  }

  async logIn(user) {
    try {
      const data = await this.request('/api/auth', 'POST', user);
      localStorage.setItem('token', data.token);
      this.user = data;
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
