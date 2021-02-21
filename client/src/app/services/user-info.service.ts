import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class UserInfoService extends BaseRequestService {
    constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
        super(_snackBar, http);
    }

    async getUserInfo(): Promise<UserInfo> {
        return await this.get<UserInfo>('/user/getinfo');
    }
}
