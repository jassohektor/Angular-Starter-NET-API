import { controller } from '../../app.constants';
import { User } from '../models/user.model';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private _dataService: DataService) {}

  getAll(): Observable<User[]> {
    return this._dataService.get(controller.user);
  }

  getUser(email: string, password:string = null): Observable<User> {
    return this._dataService.get(controller.user + `/${email}/${password}`);
  }

  createItem(item: User, password: string): Observable<User> {
    return this._dataService.post(controller.user + `/${password}`, item);
  }

  updateItem(item: User, password: string): Observable<User> {
    return this._dataService.put(controller.user + `/${password}`, item);
  }

  deleteItem(Id: number, modifiedBy: any): Observable<any> {
      return this._dataService.delete(controller.user + `/${Id}/${modifiedBy}`);
  }
}
