import { Injectable } from '@angular/core';
import { IAPIResponse } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseRequestService {
  constructor(public _snackBar: MatSnackBar, public http: HttpClient) {}

  async request(url, method = 'GET', data = null) {
    const headers = {};
    let body;

    headers['authorization'] = localStorage.getItem('token') || '';

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    // let response: any = {};
    // const response = await fetch(environment.serverUrl + url, {
    //   method,
    //   headers,
    //   body,
    // });

    let response: any;

    this.http
      .request(method, environment.serverUrl + url, {
        headers,
        body,
      })
      .subscribe(
        (resp) => {
          console.log(resp);
          response = resp;
        },
        (error) => {
          throw error;
        }
      );

    if (response.status >= 400 && response.status <= 599) {
      try {
        const message = await response['error'];
        await this.openSnackBar(message, 'ошибка');
      } catch {}
      throw new Error(`Http exeption code: ${response.status}`);
    }

    return await response;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
