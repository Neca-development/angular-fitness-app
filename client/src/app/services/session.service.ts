import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { BaseRequestService } from './base-request.service';
import jwtDecode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends BaseRequestService {
  constructor(
    private router: Router,
    public _snackBar: MatSnackBar,
    public http: HttpClient
  ) {
    super(_snackBar, http);
  }

  userData = {
    token: localStorage.getItem('token') || '',
  };

  async logIn(user) {
    try {
      const data = await this.request('/api/login', 'POST', user);
      localStorage.setItem('token', data.token);
      this.userData = data;
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

  isAuthroized() {
    console.log(this.userData);
    if (this.userData.token) return jwtDecode(this.userData.token);
    return false;
  }
}
