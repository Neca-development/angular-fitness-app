import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-fitness-client';

  token: string = localStorage.getItem('token');
  constructor(private router: Router) {}

  ngOnInit() {
    if (!this.token) this.router.navigateByUrl('/');
  }
}
