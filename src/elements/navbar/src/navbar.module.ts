import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { NavbarComponent } from './navbar.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const TAG_ELEMENT = 'ngx-navbar';

@NgModule({
  imports: [ BrowserModule, CommonModule ],
  declarations: [ NavbarComponent ],
  entryComponents: [ NavbarComponent ]
})
export class NavbarModule { 

  constructor(private injector: Injector) { }

  ngDoBootstrap() { 
    const NavbarElement = createCustomElement(NavbarComponent, { injector: this.injector });
    customElements.define(TAG_ELEMENT, NavbarElement);
  }
}

if (!(customElements.get(TAG_ELEMENT))) {
  platformBrowserDynamic()
    .bootstrapModule(NavbarModule);
}