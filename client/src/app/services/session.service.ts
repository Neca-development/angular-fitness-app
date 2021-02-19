import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { BaseRequestService } from './base-request.service';
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

  async logIn(user) {
    try {
      const data = await this.request('/api/login', 'POST', user);
      localStorage.setItem('token', data.token);
      console.log(data);
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
