import { AppSettingsIService } from '../../services/app-settings-i.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { ISetting } from 'src/app/core/models/app-setting.model';
import { User } from "../../../core/models/user.model";
import { BaseComponent } from "../../base-component";
import * as constants from "../../../app.constants";
import { Component, Input, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

import { AboutComponent } from '../../components/about/about.component';
import { app } from '../../../app.constants';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent extends BaseComponent {
  private _expiringContent: number;
  private _user: User;
  @ViewChild('aboutComponent') _about: AboutComponent;
  public consts: any;

  @Input()
  set expiringContent(value: number) {
    this._expiringContent = value;
  }
  get expiringContent(): number {
    return this._expiringContent;
  }
  get user(): User {
    return this._user;
  }

  constructor(private _appSettingsIService: AppSettingsIService, private _router: Router, private _snackbarService: SnackbarService) {
    super();
    this.consts = constants;
    this._appSettingsIService.appSettings.subscribe((data: ISetting)=>{
      this._user = data.user;
    });
  }

  openDialog() {
    this._about.openDialog();
  }

  //section(path:string): boolean { return this._router.url.includes(path); }

  overSE(link:HTMLLinkElement, path:string = '', isOut: boolean = false) {
    if(isOut && !this._router.url.includes(path)) {
      link.className = 'nav-link link-cursor';
    }
    else if (!isOut && path == '') {
      link.className = 'selected-section nav-link link-cursor';
    }
    else if (isOut && path == '') {
      link.className = 'nav-link link-cursor';
    }
    else
      link.className = 'selected-section nav-link link-cursor';
  }

  logout() {
    localStorage.removeItem(`${app}.credentials`);
    this._snackbarService.success('You have been successfully logged out!');
    this._router.navigate(['/']);
    window.location.reload();
  }
}
