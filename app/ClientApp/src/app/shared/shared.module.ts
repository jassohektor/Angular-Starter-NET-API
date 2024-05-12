import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule  } from '../core/core.module';
import { MaterialModule } from './material.module';

import { MaterialFileUploadComponent } from './components/file-upload/file-upload.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';
import { NgxGalleryModule } from "@kolkov/ngx-gallery";

//Shared IServices:
import { NativeScriptIService } from './services/native-script-i.service';
import { AppSettingsIService } from './services/app-settings-i.service';

export function windowFactory() {
    return <any>window;
}

const SharedComponents = [
  AboutComponent,
  InputFormComponent,
  DashboardComponent,
  UserAvatarComponent,
  GalleryComponent,
  MaterialFileUploadComponent
];
@NgModule({
  imports: [
      CommonModule,
      CoreModule,
      MaterialModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      NgxGalleryModule
    ],
    declarations: [...SharedComponents],
    exports: [...SharedComponents, MaterialModule],
    // entryComponents: [ModelDialogComponent],
    providers: [AppSettingsIService, NativeScriptIService, { provide: 'window', useFactory: windowFactory }]
  })
  export class SharedModule {}
