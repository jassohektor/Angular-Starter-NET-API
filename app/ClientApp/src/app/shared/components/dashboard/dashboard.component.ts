import { AppSettingsIService } from '../../services/app-settings-i.service';
import { BuildingService } from '../../../core/services/building.service';
import { LocationService } from '../../../core/services/location.service';
import { SnackbarService } from "../../../core/services/snackbar.service";
import { SnackbarType } from "../../../core/models/snackbar-type";
import { Building } from '../../../core/models/building.model';
import { Location } from '../../../core/models/location.model';

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ISetting } from 'src/app/core/models/app-setting.model';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['Id', 'Property', 'Description', 'CreatedDate', 'Active', 'Actions'];
  dataSource: MatTableDataSource<Building>;
  isEditing: boolean = false;
  selectedID: number = null;
  Locations: Location[] = [];
  modifiedBy: any;

  //Child Elements:
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private _buildingService: BuildingService, 
    private _locationService: LocationService, 
    private _snackbarService: SnackbarService,
    private _route: ActivatedRoute,
    private _appSettingsIService: AppSettingsIService) { 
    
    this._locationService.getLocations().subscribe((data: Location[])=>{
      //console.log('Data: ' + JSON.stringify(data));
      if(data instanceof HttpErrorResponse){
        this._snackbarService.error("Error: " + (data as any).message);
      }
      else{
        this.Locations = data;
      }
      this._buildingService.getBuildings().subscribe((dataSource: Building[])=>{
        if(dataSource instanceof HttpErrorResponse){
          this._snackbarService.error("Error: " + (dataSource as any).message);
        }
        else{
          this.dataSource = new MatTableDataSource(dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });

    this._appSettingsIService.appSettings.subscribe((data: ISetting)=> {
      this.modifiedBy = data.user.Id;
    });
  }

  ngAfterViewInit() {
    //this._route.queryParams.subscribe(params => { this.modifiedBy = params['user']; });
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe((action: any) => {
      this.paginator.pageIndex = 0
    });
  }

  createItem() {
    if(this.dataSource.data.some(e => e.Id == null)){
      this._snackbarService.error('You must fill out the last empty record.');
    }
    else{
      let item : Building = { Id: null, LocationId: null, Property: '', Description: '', CreatedDate: new Date(Date.now()), ModifiedBy: this.modifiedBy, Active: true };
      this.dataSource.data.push(item);
      this.dataSource.data =  this.dataSource.data.filter(e => e.Active);
      this.paginator.lastPage();
      this.editElement(item.Id);
    }
  }

  updateItem(item:Building) {
    if(item.Property.length > 0 && item.LocationId){
      item.ModifiedBy = this.modifiedBy;
      this.isEditing = false;
      this.selectedID = null;
      if(item.Id == null){
          this._buildingService.createBuilding(item).subscribe((data:Building)=>{
            if(data instanceof HttpErrorResponse){
              this._snackbarService.error("Error: " + (data as any).message);
            }
            else{
              this.dataSource.data[this.dataSource.data.findIndex(e => e.Id == null)] = data;
              this.dataSource.data =  this.dataSource.data.filter(e => e.Active);
              this._snackbarService.success("Record successfully saved!", SnackbarType.Success);
            }
          });
      }
      else{
        this._buildingService.updateBuilding(item).subscribe((data:Building)=>{
          if(data instanceof HttpErrorResponse){
            this._snackbarService.error("Error: " + (data as any).message);
          }
          else{
            this._snackbarService.success("Record successfully updated!", SnackbarType.Success);
          }
        });
      }
    }
    else{
      this._snackbarService.error(`Empty fields needed before to ${(item.Id)?'update':'create'} selected record.`);
    }
  }

  deleteItem(Id:number){
    if(Id != null){
      this._buildingService.deleteBuilding(Id, this.modifiedBy).subscribe((identity:number)=>{
        this._snackbarService.success("Record successfully deleted!", SnackbarType.Success);
        let index:number = this.dataSource.data.findIndex(e => e.Id == identity);
        this.dataSource.data.splice(index,1);
        this.dataSource.data =  this.dataSource.data.filter(e => e.Active);
      });
    }
    else{
        let index:number = this.dataSource.data.findIndex(e => e.Id == Id);
        this.dataSource.data.splice(index,1);
        this.dataSource.data =  this.dataSource.data.filter(e => e.Active);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editElement(Id:number) {
    this.isEditing = true;
    this.selectedID = Id;
  }

  isReadOnly(Id:number):boolean{
    return this.isEditing && (this.selectedID == Id);
  }
}
