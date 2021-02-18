import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class AdminInfoService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor() {
    super();
  }

  async getAllUsersInfo() {
    try {
      const data = await this.request('/admin/getallusers');
      console.log(data);
      return data;
    } catch (e) {
      return e;
    }
  }
}
