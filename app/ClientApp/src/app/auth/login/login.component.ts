import { Component, OnChanges, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { AppSettingsIService } from "src/app/shared/services/app-settings-i.service";
import { SnackbarService } from '../../core/services/snackbar.service';
import { UserService } from '../../core/services/user.service';
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, Validators } from '@angular/forms';
import { User } from  '../../core/models/user.model';
import { app } from "src/app/app.constants";
import { ReplaySubject, merge } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnChanges {
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    email = new FormControl('', [Validators.required, Validators.email]);
    errorMessage:string = '*';
    
    constructor(private _router: Router, private _userService: UserService, private _snackbarService: SnackbarService, private _appSettingsIService: AppSettingsIService) {
        merge(this.email.statusChanges, this.email.valueChanges)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(() => this.updateErrorMessage());
    }

    ngOnChanges(changes: SimpleChanges) { 
        this.updateErrorMessage();
    }

    updateErrorMessage() {
      if (this.email.hasError('required')) {
          this.errorMessage = 'You must enter a value';
      } else if (this.email.hasError('email')) {
          this.errorMessage = 'Not a valid email';
      } else {
          this.errorMessage = '';
      }
    }

    getUserByLogin(password:string) {
      this._userService.getUser(this.email.value, password).subscribe((data:User)=> {
        if(data.Id) {
          localStorage.setItem(`${app}.credentials`, JSON.stringify(data));
          this._snackbarService.success(`Welcome ${data.FirstName} ${data.LastName}`);
          this._router.navigate(["/users"]);
          setTimeout(()=>{
            this._appSettingsIService.setAppSetting =  {user: data, date: new Date(Date.now()), tmpValue: password };
          }, 500);
        }
        else {
          if(data instanceof HttpErrorResponse) {
            this._snackbarService.error(data.error);
          } 
          else {
            this._snackbarService.error('You enter wrong credentials.');
          }
        }
      });
    }
}