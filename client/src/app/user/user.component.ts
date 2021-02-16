import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../models/models';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserInfoService],
})
export class UserComponent implements OnInit {
  userIsActive: boolean = false;
  userInfo: UserInfo;

  constructor(private userInfoService: UserInfoService) {}

  async ngOnInit() {
    this.userInfo = await this.userInfoService.getUserInfo();
    this.userIsActive = true;
  }
}
