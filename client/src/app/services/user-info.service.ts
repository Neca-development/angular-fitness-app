import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
    super(_snackBar, http);
  }

  async getUserInfo() {
    try {
      const data = await this.request('/user/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
