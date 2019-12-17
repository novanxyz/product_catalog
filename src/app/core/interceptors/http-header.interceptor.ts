import { AppConfig } from './../../configs/app.config';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable } from 'rxjs';

export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({
        headers: req.headers.set('X-Openerp-Session-Id', AppConfig.sessionToken)
                            .append("Accept", 'application/json')
                            .append('Access-Control-Allow-Origin', '*')
                            // .append("User-Agent","Angular Apps/v.1.0)
      });
    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
