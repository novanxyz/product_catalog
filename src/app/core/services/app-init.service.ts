import { AppConfig } from './../../configs/app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _ } from 'underscore';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  dbId: string =  'sales@1';
  serverUrl: string ;
  context: any;
  constructor(private http: HttpClient) { }

  initializeApp(serverUrl: string, dbId: string): Promise<any> {
    this.serverUrl = serverUrl;
    this.dbId = dbId;
    return this.ensure_db(dbId);//.catch(url => this.getSessionInfo(url) );
  }

  ensure_db(dbId: string): Promise<any> {
    const context =  JSON.parse( localStorage[dbId]  || "{}" );
    return new Promise( (resolve, rejected) => {
        if (_.isEmpty(context) ||  context.error ) {
          rejected(this.serverUrl);
        }
        this.context = context['context'] || {} ;
        resolve(this.context);
    } );
  }

  getSessionInfo(serverUrl: string): Promise<any> {
    return this.http.get(serverUrl + '/api/session/get_session_info')
    .pipe(
      tap(res => {
        // @ts-ignore
        this.context['context'] = res.result;
        // @ts-ignore
        AppConfig.sessionToken = res.result.session_id;
        localStorage[this.dbId] = JSON.stringify(this.context);
      })
      // ,catchError(res => {
      //   // window.location = '/login';
      // }),
    )
    .toPromise();
  }

  getServerLocale(serverUrl: string): Promise<any> {
    return this.http.get(serverUrl + '/api/get_session_info').toPromise()
    .then(res => {
      this.context['locale'] = res;
      localStorage[this.dbId] = JSON.stringify(this.context);
    });
  }
  getSettings(serverUrl: string): Promise<any> {
    return this.http.get(serverUrl + '/api/get_session_info').toPromise()
    .then(res => {
      this.context['settings'] = res;
      localStorage[this.dbId] = JSON.stringify(this.context);
    });
  }
}
