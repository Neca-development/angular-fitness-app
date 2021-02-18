import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class AbonemetsService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor() {
    super();
  }

  async getAbonemetsInfo() {
    try {
      const data = await this.request('/abonemets/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
