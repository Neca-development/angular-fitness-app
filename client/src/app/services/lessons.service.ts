import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  token: string = localStorage.getItem('token');
  constructor(private baseRequest: BaseRequestService) {}

  async getLessonsInfo() {
    try {
      const data = await this.baseRequest.request('/lessons/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
