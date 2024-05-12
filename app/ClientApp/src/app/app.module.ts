import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { EnvironmenterModule } from 'ng-environmenter';

import { LayoutModule } from './shared/layout/layout.module';
import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    EnvironmenterModule.forRoot(environment),
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    AuthModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent
    //,ElementComponent//<--enable to declare element.
  ],
  //entryComponents: [ElementComponent],//<---enable to build elements.
  providers: []
  ,bootstrap: [AppComponent] //<---enable to launch the app && disable to create elements!
})
export class AppModule { 
  constructor(private injector: Injector) {}
  ngDoBootstrap() { //replace null with a component in case you want to create an isolated element.
    const ElementComponent = createCustomElement(null, { injector: this.injector });
    customElements.define('app-element', ElementComponent);
  }
}
