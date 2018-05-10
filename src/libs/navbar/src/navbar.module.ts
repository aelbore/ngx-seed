import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createCustomElement } from '@angular/elements';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [ BrowserModule ],
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
