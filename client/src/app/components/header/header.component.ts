import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public location: Location,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.sessionService.logOut();
  }
}
