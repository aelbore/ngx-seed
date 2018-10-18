import { NgModule, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';

export const ROUTES: ModuleWithProviders = RouterModule.forRoot([ 
  { path: 'home', loadChildren: 'home/bundles/home.umd#HomeModule' },
  { path: 'search', loadChildren: 'dist/search/bundles/search.umd#SearchModule' },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
])

@NgModule({
  imports: [ ROUTES ],
  providers: [ 
    { provide: APP_BASE_HREF, useValue : '/' }
  ]
})
export class AppRouteModule { }
