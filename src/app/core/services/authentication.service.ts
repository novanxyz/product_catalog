import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from 'src/app/configs/app.config';
import { User } from '../models/user.model';

const dbId = `${environment.dbName}@${environment.dbVersion}` ;
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        const context = JSON.parse(localStorage[dbId] || '{}');
        this.currentUserSubject = new BehaviorSubject<User>(context.user_context);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post(`${environment.serverUrl}/api/session/authenticate`,
                              { login:username, password: password, db: environment.dbName })
            .pipe(map(res => {
                // login successful if there's a jwt token in the response
                // @ts-ignore
                if (res && res.result) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // @ts-ignore
                    localStorage.setItem(dbId, JSON.stringify(res.result));
                    // @ts-ignore
                    this.currentUserSubject.next(new User(res.result));
                }

                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        return this.http.get<any>(`${environment.serverUrl}/session/destroy`)
            .pipe(map(res => {
              localStorage.removeItem(dbId);
              this.currentUserSubject.next(null);
            }));
    }

    getSessionInfo() {
      return this.http.get<any>(`${environment.serverUrl}/session/get_session_info`)
            .pipe(map(res => {
              let context = {context:res.result};
              AppConfig.sessionToken = res.result.session_id;
              localStorage[dbId] = JSON.stringify(context);
            }));
    }
}
