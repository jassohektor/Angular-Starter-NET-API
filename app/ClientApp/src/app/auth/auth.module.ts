import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { LoginComponent } from '../auth/login/login.component';

const authComponents = [
    LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...authComponents],
  exports: [...authComponents],
  entryComponents: [LoginComponent]
})
export class AuthModule {}