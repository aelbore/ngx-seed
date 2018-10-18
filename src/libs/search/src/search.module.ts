import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule } from '@angular/material';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

export const ROUTES: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: SearchComponent }
])

@NgModule({
  imports: [ 
    ROUTES, 
    CommonModule, 
    MatIconModule,
    MatToolbarModule, 
    MatInputModule, 
    MatTableModule, 
    MatButtonModule,
    HttpClientModule
  ],
  declarations: [ SearchComponent ],
  providers: [ SearchService ],
  exports: [ MatToolbarModule, MatInputModule, MatTableModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SearchModule { }