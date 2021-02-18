import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root',
})
export class LessonsService extends BaseRequestService {
  token: string = localStorage.getItem('token');
  constructor() {
    super();
  }

  async getLessonsInfo() {
    try {
      const data = await this.request('/lessons/getinfo');
      return data;
    } catch (e) {
      return e;
    }
  }
}
