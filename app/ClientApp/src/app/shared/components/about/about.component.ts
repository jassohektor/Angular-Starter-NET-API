import {MatDialog} from '@angular/material/dialog';
import {Component} from '@angular/core';

@Component({
  selector: 'app-about'
})
export class AboutComponent {
  constructor(public _matDialog: MatDialog) {}

  openDialog() {
    this._matDialog.open(DialogContent);
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss']
})
export class DialogContent {
  constructor(public _matDialog: MatDialog) {}
  closeDialog() {
    this._matDialog.closeAll();
  }
}