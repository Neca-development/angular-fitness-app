import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [SessionService],
})
export class AuthComponent implements OnInit {
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}
  hide: boolean = true;
  login: string;
  password: string;

  async logIn() {
    const user = {
      login: this.login,
      password: this.password,
    };
    await this.sessionService.logIn(user);
  }
}
