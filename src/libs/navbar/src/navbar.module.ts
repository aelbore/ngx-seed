import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createCustomElement } from '@angular/elements';

import { NavbarRouteModule } from './navbar.route.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [ RouterModule, CommonModule, BrowserModule, NavbarRouteModule ],
  declarations: [ NavbarComponent ],
  entryComponents: [ NavbarComponent ]
})
export class NavbarModule { 
  ngDoBootstrap() { }
}

platformBrowserDynamic()
  .bootstrapModule(NavbarModule)
  .then(({ injector }) => {
    const NavbarElement = createCustomElement(NavbarComponent, { injector: injector });
    customElements.define('nav-bar', NavbarElement);
  });
