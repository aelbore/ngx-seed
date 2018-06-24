import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavbarModule } from './navbar.module';

export * from './index';

platformBrowserDynamic().bootstrapModule(NavbarModule)