import { Component, HostListener, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppSettingsIService } from '../services/app-settings-i.service';
import { User } from '../../core/models/user.model';
import { IAction } from '../../core/models/app-setting.model';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements AfterViewInit {
    mode = new FormControl('side');
    isAdminLayout: boolean = false;
    menuIsOpen: boolean = false;
    containerHeight: string = "1024px";

    static isMobileCalc(width: number): boolean {
        return width < 1024;
    }

    @ViewChild('sideNav') sideNav : MatSidenav;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const isMobileDisplay = LayoutComponent.isMobileCalc(event.target.innerWidth);
        this.containerHeight = event.target.innerHeight + 'px';
    }

    constructor(private _appSettingsIService: AppSettingsIService) {}
    ngAfterViewInit() {
        this._appSettingsIService.appActions.subscribe((data: IAction<User>)=> {
            if(data) {
              if(data.element && data.function) {
                setTimeout(()=>{
                  //console.log(`${data.element} - ${data.function}`);
                  this[data.element][data.function]();
                }, 50);
              }
              else {
                this[data.function]();
              }
            }
        });
    }

    menuCloseEvent(event:boolean) {
      if (event) {
        this.sideNav.close()
      }
    }
}
