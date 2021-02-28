import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from './../../environments/environment';
import { IAPIResponse } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BaseRequestService {
  constructor(public _snackBar: MatSnackBar, public http: HttpClient) {}

  get<T>(url: string): Promise<T> {
    return this.request(url, 'GET');
  }

  post<T>(url: string, data: any): Promise<T> {
    return this.request(url, 'POST', data);
  }

  private async request<T>(
    url,
    method: 'GET' | 'POST' = 'GET',
    data = null
  ): Promise<T> {
    let body;

    const headers = {
      authorization: localStorage.getItem('token') || '',
    };

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    try {
      const response = await this.http
        .request<IAPIResponse<T>>(method, environment.serverUrl + url, {
          headers,
          body,
        })
        .toPromise();
      return response.data;
    } catch (e) {
      const errorObject = e as HttpErrorResponse;
      const errorData = errorObject.error as IAPIResponse<any>;
      if (
        errorData != null &&
        errorData.errorMessage != null &&
        errorData.errorMessage != ''
      ) {
        this.openSnackBar(errorData.errorMessage, 'ошибка');
      } else {
        this.openSnackBar(errorObject.message, 'ошибка');
      }

      throw e;
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
