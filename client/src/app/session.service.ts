import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user: {};

  constructor() {
    this.user = this.request('/user', 'GET');
    console.log(this.user);
  }

  async logIn(user) {
    const data = await this.request('/api/auth', 'POST', user);
    localStorage.setItem('token', data.token);
    this.user = data;
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
    return await response.json();
  }
}
