import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface INavigation {
  text: string;
  path: string;
}

@Component({
  selector: 'ngx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent  { 
  private _navigations$: Observable<INavigation[]> = of([]);

  @Output() onNavigate = new EventEmitter();

  @Input() set navigations(value) {
    let result: Observable<INavigation[]> = value;
    if (typeof value === 'string') {
      try {
        result = of(JSON.parse(value));
      } catch (e) {
        throw new Error(e);
      }
    } else if (value instanceof Array) {
      result = value;
    } else {
      throw new Error(`navigations value: ${value} should be Array.`)
    }
    this._navigations$ = result;
  }

  get navigations() {
    return this._navigations$;
  }

  private getElementByPath(path: string) {
    return document.querySelector("nav a[path-url='" + path + "']");
  }

  navigateLink(e: Event, path: string) {
    this.onNavigate.emit({ element: e.target, path: path });
  }

  @HostListener('setState', [ '$event' ])
  setState(e: CustomEvent) {
    const aElements = document.querySelectorAll('nav a.active');
    for(let i = 0; i <= aElements.length - 1; i++) {
      aElements[0].classList.remove('active');
    }
    const element = e.detail['element'] || this.getElementByPath(e.detail.path) || this.getElementByPath('/');
    const aElement = element as HTMLAnchorElement;
    aElement.classList.add('active'); 
  }

}