import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  token: string = localStorage.getItem('token');
  constructor() {}

  async getUserInfo() {
    try {
      const data = await this.request('/user/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }

  async request(url, method = 'GET', data = null) {
    const headers = {};
    headers['authorization'] = localStorage.getItem('token') || '';
    let body;
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    const response = await fetch(`http://127.0.0.1:7000${url}`, {
      method,
      headers,
      body,
    });
    if (response.status >= 400 && response.status <= 599)
      throw new Error(`Http exeption code: ${response.status}`);
    return await response.json();
  }
}
