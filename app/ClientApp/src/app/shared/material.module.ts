// import { MatFileUploadModule } from './mat-file-upload-module/matFileUpload.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule }  from "@angular/material/autocomplete";
import { MatButtonModule}  from "@angular/material/button";
import { MatButtonToggleModule}  from "@angular/material/button-toggle";
import { MatCardModule}  from "@angular/material/card";
import { MatCheckboxModule}  from "@angular/material/checkbox";
import { MatChipsModule}  from "@angular/material/chips";
import { MatDatepickerModule}  from "@angular/material/datepicker";
import { MatDialogModule}  from "@angular/material/dialog";
import { MatDividerModule}  from "@angular/material/divider";
import { MatExpansionModule}  from "@angular/material/expansion";
import { MatIconModule}  from "@angular/material/icon";
import { MatInputModule}  from "@angular/material/input";
import { MatLineModule}  from "@angular/material/core";
import { MatListModule}  from "@angular/material/list";
import { MatMenuModule}  from "@angular/material/menu";
import { MatNativeDateModule}  from "@angular/material/core";
import { MatOptionModule}  from "@angular/material/core";
import { MatProgressBarModule}  from "@angular/material/progress-bar";
import { MatProgressSpinnerModule}  from "@angular/material/progress-spinner";
import { MatRadioModule}  from "@angular/material/radio";
import { MatRippleModule}  from "@angular/material/core";
import { MatSelectModule}  from "@angular/material/select";
import { MatSidenavModule}  from "@angular/material/sidenav";
import { MatSliderModule}  from "@angular/material/slider";
import { MatSlideToggleModule}  from "@angular/material/slide-toggle";
import { MatSnackBarModule}  from "@angular/material/snack-bar";
import { MatTabsModule}  from "@angular/material/tabs";
import { MatToolbarModule}  from "@angular/material/toolbar";
import { MatTooltipModule}  from "@angular/material/tooltip";
import { MatTreeModule}  from "@angular/material/tree";
import { MatSortModule}  from "@angular/material/sort";
import { MatPaginatorModule}  from "@angular/material/paginator";
import { MatTableModule}  from "@angular/material/table";


export const MaterialImports = [
  MatAutocompleteModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatLineModule,
  MatListModule,
  MatDividerModule,
  MatOptionModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatExpansionModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatTreeModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MaterialImports],
  exports: [
    ...MaterialImports]
})
export class MaterialModule {}
