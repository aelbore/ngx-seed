import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

export const ROUTES: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: SearchComponent }
])

@NgModule({
  imports: [ 
    ROUTES, 
    CommonModule, 
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule
  ],
  declarations: [ SearchComponent ],
  providers: [ SearchService ],
  exports: [ MatToolbarModule, MatInputModule, MatTableModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SearchModule { }