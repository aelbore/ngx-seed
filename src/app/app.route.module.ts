import { NgModule, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';

export const ROUTES: ModuleWithProviders = RouterModule.forRoot([ 
  { path: 'about', loadChildren: 'dist/about/bundles/about.umd#AboutModule' },
  { path: 'home', loadChildren: 'dist/home/bundles/home.umd#HomeModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
])

@NgModule({
  imports: [ ROUTES ],
  providers: [ 
    { provide: APP_BASE_HREF, useValue : '/' }
  ]
})
export class AppRouteModule { }
