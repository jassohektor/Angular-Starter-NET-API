import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base-component';
import { AppSettingsIService } from '../../services/app-settings-i.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('bttnNav')bttnNav: ElementRef;
  isAdminLayout: boolean;
  constructor(private _router: Router, private _appSettingsIService: AppSettingsIService) {
    super();
  }

  ngAfterViewInit() {
    if(!(this.bttnNav.nativeElement as HTMLButtonElement).style.display.includes('none')) {
      this.toggleMenu('open');
    }
    
    this.isAdminLayout = this._router.url.indexOf('admin') > 0;
  }

  gotoHome() {
    this._router.navigateByUrl('/');
  }

  toggleMenu(fnName: string){
    this._appSettingsIService.setAppAction = { element: 'sideNav', function: fnName };
  }
}
