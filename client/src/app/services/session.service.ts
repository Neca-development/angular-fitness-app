import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user: User;

  constructor() {
    const token = localStorage.getItem('token');
    if (token) this.user = jwtDecode(token);
  }

  async logIn(user) {
    try {
      const data = await this.request('/api/auth', 'POST', user);
      localStorage.setItem('token', data.token);
      this.user = data;
      return data;
    } catch (e) {
      console.log(e);
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
