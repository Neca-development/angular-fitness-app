import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminInfoService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
    super(_snackBar, http);
  }

  async getAllUsersInfo(): Promise<UserInfo[]> {
    return await this.get<UserInfo[]>('/admin/get-all-users');
  }
}
