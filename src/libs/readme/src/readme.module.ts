import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ReadMeComponent } from './readme.component';
import { ReadmeService } from './readme.service';
import { CommonModule } from '@angular/common';

export const ROUTES: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: ReadMeComponent }
])

@NgModule({
  imports: [ CommonModule, ROUTES, HttpClientModule ],
  providers: [ ReadmeService ],
  declarations: [ ReadMeComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReadMeModule { }