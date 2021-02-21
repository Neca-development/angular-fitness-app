import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

import { Abonements } from '../models/models';

@Injectable({
    providedIn: 'root',
})
export class AbonementsService extends BaseRequestService {
    constructor(public _snackBar: MatSnackBar, public http: HttpClient) {
        super(_snackBar, http);
    }

    async getAbonementsInfo(): Promise<Abonements> {
        return await this.get<Abonements>('/abonements/getinfo');
    }
}
