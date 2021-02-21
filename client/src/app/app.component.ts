import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  	title = 'angular-fitness-client';

  	constructor(private router: Router, private _sessionService: SessionService) {
  	}

	ngOnInit() {
  		this._sessionService.init();

  		if (!this._sessionService.isAuthroized) {
  			this.router.navigateByUrl('/');
  		} else {
  			// TODO: redirect to home page
  		}
  	}
}
