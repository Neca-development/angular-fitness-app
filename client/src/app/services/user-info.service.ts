import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor() {
    super();
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
