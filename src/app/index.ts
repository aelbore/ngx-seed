import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

export * from './app.module';
export * from './app.component';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(error => console.log(error));
