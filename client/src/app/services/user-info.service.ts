import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  token: string = localStorage.getItem('token');
  constructor(private baseRequest: BaseRequestService) {}

  async getUserInfo() {
    try {
      const data = await this.baseRequest.request('/user/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
