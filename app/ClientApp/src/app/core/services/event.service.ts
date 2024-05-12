import { User } from '../models/user.model';
import { Client } from '../models/client.model';
import { Corporation } from '../models/corporation.model';
import { storedCredentials } from '../../app.constants';
import { HttpParams } from "@angular/common/http";
import { controller } from '../../app.constants';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable()
export class EventService {
  constructor(private _dataService: DataService) {
      storedCredentials.subscribe((data: User)=>{
        this.credenciales = data;
      });
  }
  private credenciales: User;

  updateUrl(newUrl:string) {
    this._dataService.outUrl.next(newUrl);
  }

  getClients(): Observable<Client[]> {
    return this._dataService.get(`${controller.event}/clients/`);
  }

  getList(amount = 50): Observable<any> {
      return this._dataService.get(`${controller.event}?amount=${amount}`);
  }

  getRecords(startDate: string, endDate: string, startIndex: number = 1): Observable<any[]> {
    let httpParams: HttpParams = new HttpParams();
    let param:string[] = Object.getOwnPropertyNames(this.credenciales)
      for (let x in param) {
          httpParams.set(x, param[x]);
      }
      return this._dataService.get(`${controller.event}/reports/${startDate}/${endDate}?startIndex=${startIndex}`, httpParams);
  }

  delete(uuid:string): Observable<any> {
    return this._dataService.delete(`${controller.event}?id=${uuid}`);
  }
}
