import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User, IAuthorizedUser } from '../models/models';
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

  userJwtData?: any;

  init() {
    const token = localStorage.getItem('token');

    if (token) {
      this.userJwtData = jwtDecode(token);
    }
  }

  async logIn(user): Promise<any> {
    const data = await this.post<IAuthorizedUser>('/api/login', user);
    localStorage.setItem('token', data.token);
    this.userJwtData = jwtDecode(data.token);
    console.log(this.userJwtData);
    return this.userJwtData;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('logOut');
    this.userJwtData = '';
    this.router.navigateByUrl('/');
  }

  isAuthroized(): boolean {
    console.log(this.userJwtData);
    return this.userJwtData != null;
  }
}
