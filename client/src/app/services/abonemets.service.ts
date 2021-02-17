import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class AbonemetsService {
  token: string = localStorage.getItem('token');
  constructor(private baseRequest: BaseRequestService) {}

  async getAbonemetsInfo() {
    try {
      const data = await this.baseRequest.request('/abonemets/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
