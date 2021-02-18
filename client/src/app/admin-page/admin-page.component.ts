import { Component, OnInit } from '@angular/core';
import { SessionService } from './../services/session.service';
import { AdminInfoService } from './../services/admin-info.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  users: [] = [];

  constructor(
    private sessionService: SessionService,
    private adminInfoService: AdminInfoService
  ) {}

  async ngOnInit() {
    this.users = await this.adminInfoService.getAllUsersInfo();
  }
  logOut() {
    this.sessionService.logOut();
  }
}
