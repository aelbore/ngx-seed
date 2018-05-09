import { NgModule, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';

export const ROUTES: ModuleWithProviders = RouterModule.forRoot([ 
  { path: 'about', loadChildren: 'dist/libs/about/src/about.module#AboutModule' },
  { path: 'home', loadChildren: 'dist/libs/home/src/home.module#HomeModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
], 
{ preloadingStrategy: PreloadAllModules });

@NgModule({
  imports: [ ROUTES ],
  providers: [ 
    { provide: APP_BASE_HREF, useValue : '/' }
  ]
})
export class NavbarRouteModule { }
