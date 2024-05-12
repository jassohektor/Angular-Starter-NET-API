import { MatSnackBarConfig, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { BaseComponent } from "../../base-component";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent extends BaseComponent {
  private _messageType: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    super();
  }
  
  close() {}

  checkSnackbarType(type: string): boolean {
    return this._messageType === type;
  }
}
