import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ISetting, IAction } from '../../core/models/app-setting.model';

@Injectable()
export class AppSettingsIService {
    public appSettings: BehaviorSubject<ISetting> = new BehaviorSubject<ISetting>({
        user: { 
            Id: null, FirstName: '', LastName: '',
            Address:'Unknown' , Gender: 'U',
            PhotoUrl:'./assets/unknown.png', 
            Points: 0, CreatedDate: new Date(Date.now()), Active: true
        }, 
        date: new Date(Date.now())
    });
    public appActions: BehaviorSubject<IAction<any>> = new BehaviorSubject<IAction<any>>(null);
    constructor(){

    }

    set setAppSetting(data: ISetting){
        this.appSettings.next(data);
    }
    set setAppAction(data: IAction<any>){
        this.appActions.next(data);
    }
}