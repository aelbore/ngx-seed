import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit { 

  constructor(private router: Router) { }

  ngAfterViewInit() {
    const navbar = window.document.querySelector('nav-bar');
    navbar.addEventListener('onNavigate', (e: CustomEvent) => {
      const onSuccessEmit = status => {
        e.target.dispatchEvent(new CustomEvent('onSuccess', { 
          bubbles: true,
          detail: { element: e.detail.element, status: status }
        }));
      }
      this.router.navigateByUrl(e.detail.path)
        .then(() => onSuccessEmit('success'))
        .catch(error => onSuccessEmit('error'));
    });
  }

}