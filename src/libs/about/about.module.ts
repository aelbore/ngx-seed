import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

export const ROUTES: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: AboutComponent }
])

@NgModule({
  imports: [ ROUTES ],
  declarations: [ AboutComponent ],
  exports: [ AboutComponent ]
})
export class AboutModule { }