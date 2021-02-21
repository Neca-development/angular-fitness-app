import { Injectable } from '@angular/core';
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

    let response: any;

    try {
      await this.http
        .request(method, environment.serverUrl + url, {
          headers,
          body,
        })
        .toPromise()
        .then((data: Response) => (response = data))
        .catch((error) => {
          if (error.status >= 400 && error.status <= 599) {
            const message =
              error['error']['errorMessage'] || 'На сервере возникли неполадки';
            this.openSnackBar(message, 'ошибка');
          }
          throw new Error(JSON.stringify(error));
        });

      return response;
    } catch (error) {
      throw error;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
