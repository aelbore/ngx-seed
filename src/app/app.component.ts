import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit { 

  constructor(private router: Router) { }

  ngAfterViewInit() {
    const navbar = document.querySelector('ngx-navbar');
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const homePath = this.router.config.find(value => value.hasOwnProperty('redirectTo'));
        navbar.dispatchEvent(new CustomEvent('setState', {
          bubbles: true,
          detail: { 
            path: (homePath && (homePath.redirectTo === e.url || e.url === '/')
              ? homePath.redirectTo : e.url) 
          }
        }));
      }
    });
    navbar.addEventListener('onNavigate', (e: CustomEvent) => {
      this.router.navigateByUrl(e.detail.path);
    });
  }

}