import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared.module';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './menu/menu.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

const LayoutComponents = [
  LayoutComponent,
  HeaderComponent,
  SearchComponent,
  SnackbarComponent,
  MenuComponent,
  NotfoundComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [...LayoutComponents],
  exports: [...LayoutComponents],
  entryComponents: [SnackbarComponent]
})
export class LayoutModule {}
