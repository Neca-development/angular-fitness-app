import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class LessonsService extends BaseRequestService {
    constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
      super(_snackBar, http);
    }

    async getLessonsInfo(): Promise<Lesson[]> {
        return await this.get<Lesson[]>('/lessons/getinfo');
    }
}
