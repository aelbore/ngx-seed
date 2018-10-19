import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: [ './toolbar.component.scss' ],
  encapsulation: ViewEncapsulation.Native
})
export class ToolbarComponent { 

  @Input() header = 'Github';


}