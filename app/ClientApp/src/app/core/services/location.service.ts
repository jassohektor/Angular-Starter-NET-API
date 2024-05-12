import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';
import { Observable } from 'rxjs';
import { controller } from '../../app.constants';

@Injectable()
export class LocationService {
  constructor(private _dataService: DataService) {}

  getLocations(): Observable<Location[]> {
    return this._dataService.get(controller.location);
  }
}
