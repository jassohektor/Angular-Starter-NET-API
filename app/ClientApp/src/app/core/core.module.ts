import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataService } from './services/data.service';
import { BuildingService } from './services/building.service';
import { LocationService } from './services/location.service';
import { SnackbarService } from './services/snackbar.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';

const CoreProviders = [
  SnackbarService,
  DataService,
  BuildingService,
  LocationService,
  UserService,
  EventService
];

@NgModule({
  imports: [CommonModule],
  providers: [...CoreProviders]
})
export class CoreModule {}
