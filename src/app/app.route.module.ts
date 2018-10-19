import { NgModule, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

export const ROUTES: ModuleWithProviders = RouterModule.forRoot([ 
  { path: 'search', loadChildren: 'dist/search/bundles/search.umd#SearchModule' },
  { path: 'readme/:username/:repo', loadChildren: 'dist/readme/bundles/readme.umd#ReadMeModule' },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
])


@NgModule({
  imports: [ ROUTES ],
  providers: [ 
    { provide: APP_BASE_HREF, useValue : '/' }
  ]
})
export class AppRouteModule { }
