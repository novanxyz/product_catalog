import { AppInitService } from './core/services/app-init.service';
import {ErrorHandler, NgModule, APP_INITIALIZER} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {WebpackTranslateLoader} from './webpack-translate-loader';
import {APP_CONFIG, AppConfig} from './configs/app.config';
import {SharedModule} from './shared/shared.module';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {FirebaseModule} from './shared/modules/firebase.module';
import {SentryErrorHandler} from './core/sentry.errorhandler';
import { ProductsModule } from './modules/products/products.module';
import { HttpHeaderInterceptor } from './core/interceptors/http-header.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export function initializeApp(appInitService: AppInitService) {
  return () => appInitService.initializeApp(environment.serverUrl,
                                  environment.dbName + '@' + environment.dbVersion);

}

@NgModule({
  imports: [
    HttpClientModule,
    FirebaseModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    NoopAnimationsModule,
    CoreModule,
    SharedModule,
    ProductsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppInitService,
    {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ AppInitService ], multi:true },
    {provide: APP_CONFIG, useValue: AppConfig },
    // {provide: ErrorHandler, useClass: SentryErrorHandler, },
    {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
