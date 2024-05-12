import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { AppSettingsIService } from  '../../../shared/services/app-settings-i.service';
import { SnackbarService } from "../../../core/services/snackbar.service";
import { SnackbarType } from "../../../core/models/snackbar-type";
import { UserService } from '../../../core/services/user.service';
import { ISetting } from '../../../core/models/app-setting.model';
import { User } from '../../../core/models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

class tmpUser {
  Id:number;
  tmpValue:string;
}

@Component({
    selector: 'app-input-form',
    templateUrl: 'input-form.component.html',
    styleUrls: ['input-form.component.scss']
  })
  export class InputFormComponent implements AfterViewInit {
    text = new FormControl('', [Validators.required, Validators.nullValidator]);
    dropdown = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.nullValidator]);
    phone = new FormControl('', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]);
    selectedEntity: User = new User();
    users: User[] = [];
    inputForm: FormGroup = this._fb.group({
      FirstName: this.text,
      LastName: '',
      Gender: this.dropdown,
      Title: '',
      Address: '',
      Alias: '',
      Email: this.email,
      Password: this.password,
      ZipCode: '',
      BirthDate: '',
      Phone: this.phone,
      Description: ''
    });
    inProgress: boolean = false;
    modifiedBy: any;
    tmpObserver: BehaviorSubject<tmpUser> = new BehaviorSubject<tmpUser>(null);
    hide = true;
    _tmpUser: tmpUser;
    @ViewChild('userList') userList: MatSelectionList;

    constructor(private _fb: FormBuilder, private _userService: UserService, private _appSettingsIService: AppSettingsIService, private _snackbarService: SnackbarService) {
      this._userService.getAll().subscribe((data: User[])=> {
        if(data instanceof HttpErrorResponse) {
          this._snackbarService.error("Error: " + (data as any).message);
        }
        else {
          if(data.length > 0) {
            this.users = data;
            setTimeout(()=>{
              this.userList.selectedOptions.select(this.userList.options.first);
              let Id: any = this.userList.selectedOptions.selected[0].value;
              this.selectedEntity = this.users.find(e => e.Id == Id);
              this.setValues(this.selectedEntity);
            },500);
          }
        }
      });

      this.tmpObserver.subscribe((user:tmpUser)=> {
        if(user != null) {
          this._tmpUser = user;
        }
      });
    }

    ngAfterViewInit() {
      this.userList.selectionChange.subscribe((item: MatSelectionListChange)=>{
        this.userList.deselectAll();
        this.userList.selectedOptions.select(item.option);
        if(item.option.selected){
          this.selectedEntity = this.users.find(e => e.Id == item.option.value);
          this.setValues(this.selectedEntity);
        }
        else{
          this.selectedEntity = new User();
          this.setValues(null);
        }
      });

      this._appSettingsIService.appSettings.subscribe((data: ISetting)=> {
        this.modifiedBy = data.user.Id;
        if(data.tmpValue) {
          this._tmpUser = { Id: data.user.Id, tmpValue: data.tmpValue };
          this.tmpObserver.next({ Id: data.user.Id, tmpValue: data.tmpValue });
        }
      });
    }

    setValues(entity: User) {
        this.inputForm.get("FirstName").setValue(entity? entity.FirstName: null);
        this.inputForm.get("LastName").setValue(entity? entity.LastName: null);
        this.inputForm.get("Gender").setValue(entity? entity.Gender: null);
        this.inputForm.get("Title").setValue(entity? entity.Title: null);
        this.inputForm.get("Address").setValue(entity? entity.Address: null);
        this.inputForm.get("Alias").setValue(entity? entity.AlsoKnownAs: null);
        this.inputForm.get("Email").setValue(entity? entity.Email: null);
        this.inputForm.get("Password").setValue(entity && this._tmpUser? (entity.Id == this._tmpUser.Id? this._tmpUser.tmpValue: null) : null);
        this.inputForm.get("ZipCode").setValue(entity? entity.ZipCode: null);
        this.inputForm.get("BirthDate").setValue(entity? entity.BirthDate: null);
        this.inputForm.get("Phone").setValue(entity? entity.Phone: null);
        this.inputForm.get("Description").setValue(entity? entity.Description: null);
        this.inputForm.markAsPristine();
    }

    updateEntity() {
      this.inProgress = true;
      this.selectedEntity.FirstName = this.inputForm.get("FirstName").value;
      this.selectedEntity.LastName = this.inputForm.get("LastName").value;
      this.selectedEntity.Gender = this.inputForm.get("Gender").value;
      this.selectedEntity.Title = this.inputForm.get("Title").value;
      this.selectedEntity.Address = this.inputForm.get("Address").value;
      this.selectedEntity.AlsoKnownAs = this.inputForm.get("Alias").value;
      this.selectedEntity.Email = this.inputForm.get("Email").value;
      this.selectedEntity.ZipCode = this.inputForm.get("ZipCode").value;
      this.selectedEntity.BirthDate = this.inputForm.get("BirthDate").value;
      this.selectedEntity.Phone = this.inputForm.get("Phone").value;
      this.selectedEntity.Description = this.inputForm.get("Description").value;
      this.selectedEntity.ModifiedBy = this.modifiedBy;
      this.selectedEntity.Active = true;
      let tmpValue: string =  '';
      
      if(this.selectedEntity.Id) {

        let newRecord: boolean = false;
        if(this.inputForm.get("Password").value) {
          if(this._tmpUser) {
            if(this.selectedEntity.Id == this._tmpUser.Id) {
              tmpValue = this.inputForm.get("Password").value;
              this._tmpUser.tmpValue = this.inputForm.get("Password").value;
            }
            else
              newRecord = true;
          }
          else
            newRecord = true;
        }

        if(newRecord) {
          tmpValue = this.inputForm.get("Password").value;
          this._tmpUser= {Id: this.selectedEntity.Id, tmpValue: tmpValue};
        }

        this._userService.updateItem(this.selectedEntity, tmpValue).subscribe((data:User)=>{
          if(data instanceof HttpErrorResponse){
            this._snackbarService.error("Error: " + (data as any).message);
          }
          else{
            let index: number = this.users.findIndex(e => e.Id == this.selectedEntity.Id);
            this.users[index] = this.selectedEntity;
            this.refreshList("updated");
          }
        });
      }
      else {
        tmpValue = this.inputForm.get("Password").value;
        this.selectedEntity.CreatedDate = new Date(Date.now());
        this._userService.createItem(this.selectedEntity, tmpValue).subscribe((data:User)=>{
          if(data instanceof HttpErrorResponse){
            this._snackbarService.error("Error: " + (data as any).message);
          }
          else{
            this.users.push(data);
            this.users = this.users.filter(e => e.Active);
            this.selectedEntity = data;
            this.refreshList("created");
          }
        });
      }
    }

    deleteEntity() {
      this.inProgress = true;
      this._userService.deleteItem(this.selectedEntity.Id, this.modifiedBy).subscribe((identifier:any)=>{
        if(identifier instanceof HttpErrorResponse){
          this._snackbarService.error("Error: " + (identifier as any).message);
        }
        else{
          let index:number = this.users.findIndex(e => e.Id == identifier)
          this.users.splice(index, 1);
          this.selectedEntity = this.users[(index >= 1) ? (index -1): 0];       
          this.refreshList("deleted");
        }
      });
    }

    newEntity() :void {
      this.selectedEntity = new User();
      this.setValues(null);
      this.userList.deselectAll();
    }

    refreshList(action:string){
      setTimeout(()=>{
        this.userList.selectedOptions.select(this.userList.options.find(e => e.value == this.selectedEntity.Id));
      }, 500);
      this.setValues(this.selectedEntity);
      this.inputForm.markAsPristine();
      this.inProgress = false;
      this._snackbarService.success(`Record successfully ${action}!`, SnackbarType.Success);
    }

    getErrorMessage(validatorName:string) {
      if (this[validatorName].hasError('required')) {
        return 'You must enter a value.';
      }
      if (this[validatorName].hasError('pattern')) {
        return 'You must enter a valid pattern.';
      }
      return this[validatorName].hasError('email') ? 'Not a valid email.' : '';
    }

    handleInput(options : Array<MatListOption>): string {
      let opt: any = [ { value: null } ];
      if(options.length > 0) {
        opt = options[0];
      }
      
      return opt? opt.value: null;
    }
}
  
  