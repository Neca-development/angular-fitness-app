import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AbonementsService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
    super(_snackBar, http);
  }

  async getAbonementsInfo() {
    try {
      const data = await this.request('/abonements/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
