import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ToolbarModule } from './toolbar.module';

export * from './index';

platformBrowserDynamic().bootstrapModule(ToolbarModule);