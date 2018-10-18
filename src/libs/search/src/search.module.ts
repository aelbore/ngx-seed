import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';

export const ROUTES: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: SearchComponent }
])

@NgModule({
  imports: [ ROUTES ],
  declarations: [ SearchComponent ],
  exports: [ SearchComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SearchModule { }