import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { DataService } from "./data.service";
import { controller } from '../../app.constants';
import { Building } from '../models/building.model';

@Injectable()
export class BuildingService {
  constructor(private _dataService: DataService) {}

  getBuildings(parameters?: any): Observable<Building[]> {
    let httpParams: HttpParams = new HttpParams();
    if(parameters){
      let param:string[] = Object.getOwnPropertyNames(parameters)
      for (let x in param) {
          httpParams.set(x, param[x]);
      }
      return this._dataService.get(`${controller.building}`, httpParams);
    }
    else{
      return this._dataService.get(`${controller.building}`);
    }
  }

  createBuilding(item: Building): Observable<any> {
    return this._dataService.post(controller.building, item);
  }

  updateBuilding(item: Building): Observable<any> {
    return this._dataService.put(controller.building, item);
  }

  deleteBuilding(Id: number, modifiedBy: any): Observable<any> {
      return this._dataService.delete(controller.building + `/${Id}/${modifiedBy}`);
  }
}