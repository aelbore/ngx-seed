import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { ShellComponent } from './shell.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ ShellComponent ],
  entryComponents: [ ShellComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShellModule { 

  constructor (private injector: Injector) { }

  ngDoBootstrap() { 
    const ShellElement = createCustomElement(ShellComponent, { injector: this.injector });
    customElements.define('ngx-shell', ShellElement);
  }
}

if (!(customElements.get('ngx-shell'))) {
  platformBrowserDynamic()
    .bootstrapModule(ShellModule);
}
