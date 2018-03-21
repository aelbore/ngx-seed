import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { NavbarModule } from './navbar';
import { ToobarModule } from './toolbar';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    CommonModule,
    RouterModule.forRoot([
      { path: 'about', loadChildren: 'libs/bundles/about.umd#AboutModule' },
      { path: 'home', loadChildren: 'libs/bundles/home.umd#HomeModule' }
    ]),
    NavbarModule,
    ToobarModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }