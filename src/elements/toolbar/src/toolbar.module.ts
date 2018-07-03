import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { ToolbarComponent } from './toolbar.component';

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
    customElements.define('tool-bar', ToolbarElement);
  }
}