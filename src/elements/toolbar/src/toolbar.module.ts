import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { ToolbarComponent } from './toolbar.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const TAG_NAME = 'ngx-toolbar';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ ToolbarComponent ],
  exports: [ ToolbarComponent ],
  entryComponents: [ ToolbarComponent ]
})
export class ToolbarModule { 

  constructor(private injector: Injector) { }

  ngDoBootstrap() { 
    const ToolbarElement = createCustomElement(ToolbarComponent, { injector: this.injector });
    customElements.define(TAG_NAME, ToolbarElement);
  }
}

if (!(customElements.get(TAG_NAME))) {
  platformBrowserDynamic()
    .bootstrapModule(ToolbarModule);
}