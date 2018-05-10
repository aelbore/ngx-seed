import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent  { 
  @Output() onNavigate = new EventEmitter();

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