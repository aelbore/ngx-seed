import { NgModule, Injector, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { AppRouteModule } from './app.route.module';

@NgModule({
  imports: [ BrowserModule, CommonModule, RouterModule, AppRouteModule ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ],
  entryComponents: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { 

  constructor(private injector: Injector) { }

  ngDoBootstrap() { 
    const AppElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app', AppElement);
  }
}