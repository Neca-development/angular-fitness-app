import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SessionService } from './../services/session.service';
import { AdminInfoService } from './../services/admin-info.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  coins: number;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'coins'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
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
