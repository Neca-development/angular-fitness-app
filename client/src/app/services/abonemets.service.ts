import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AbonemetsService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
    super(_snackBar, http);
  }

  async getAbonemetsInfo() {
    try {
      const data = await this.request('/abonemets/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
