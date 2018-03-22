import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarModule } from './navbar/index';
import { ToolbarModule } from './toolbar/index';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, CommonModule, NavbarModule, ToolbarModule, RouterModule.forRoot([ ]) ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }