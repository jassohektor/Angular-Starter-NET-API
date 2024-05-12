import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './shared/components/gallery/gallery.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { InputFormComponent } from './shared/components/input-form/input-form.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: InputFormComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    enableTracing: false,
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 64] // [x, y]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
