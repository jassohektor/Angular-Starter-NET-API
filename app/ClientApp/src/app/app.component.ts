import { AppSettingsIService } from './shared/services/app-settings-i.service';
import { Component, Input, AfterContentInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getCredentials } from './app.constants';
import { User } from './core/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterContentInit {
  constructor(private location: Location, private _router: Router, private _appSettingsIService: AppSettingsIService) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshSite();
      }
    });
  }
  
  title:string = 'Veröld | Starter';
  isAuthenticated:boolean = false;
  setCredentials:boolean = false;

  ngAfterContentInit() {
    this.refreshSite();
  }

  refreshSite() {
    const userData: User = getCredentials('credentials');
    if (userData) {
      this._appSettingsIService.setAppSetting =  { user: userData, date: new Date(Date.now()) };
      this.isAuthenticated = userData.Active;
      this.setCredentials = false;
    }
    else if (this.location.path().includes('/login')) {
      this.setCredentials = true;
    }
    else {
      this.isAuthenticated = false;
    }
  }

  authCredentials() {
    this.setCredentials = true;
  }
}