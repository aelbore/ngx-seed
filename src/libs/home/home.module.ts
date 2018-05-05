import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

export const ROUTES: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: HomeComponent }
])

@NgModule({
  imports: [ ROUTES ],
  declarations: [ HomeComponent ],
  exports: [ HomeComponent ]
})
export class HomeModule { }