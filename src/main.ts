import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(res => console.log("app init resolved", res ) )
  .catch(err => {
    console.log("app init failed", err ) ;
    document.querySelector('.login-page').style.display = 'block';
    document.querySelector('.loading-page').style.display = 'none';
  });
