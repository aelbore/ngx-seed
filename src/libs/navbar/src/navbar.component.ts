import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
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
  _navigations: Observable<INavigation[]> = of([]);

  @Output() onNavigate = new EventEmitter();

  @Input('nav-items') set navigations(value) {
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
      throw new Error(`nav-items value: ${value} should be Array.`)
    }
    this._navigations = result;
  }

  get navigations() {
    return this._navigations;
  }

  navigateLink(e: Event, path: string) {
    this.onNavigate.emit({ element: e.target, path: path });
  }

  @HostListener('onSuccess', [ '$event' ]) 
  onSuccess(e: CustomEvent) {
    const aElements = document.querySelectorAll('nav a');
    for(let i = 0; i <= aElements.length - 1; i++) {
      aElements[i].classList.remove('active');
    }
    if (e.detail['element']) {
      const aElement = e.detail.element as HTMLAnchorElement;
      aElement.classList.add('active');
    }
  } 

}