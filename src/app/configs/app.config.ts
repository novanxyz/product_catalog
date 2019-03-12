import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    products:'products',
    error404: '404'
  },
  serverUrl: 'http://localhost:4200',
  dbname: 'sales',
  sessionToken:'',
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/novanxyz/product_catalog',
  sentryDSN: "https://793c06a87216424fb5a8a833f149ede8@sentry.io/1354351"

};
