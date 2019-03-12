import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { _ } from 'underscore';

const dbId =  environment.dbName + '@' + environment.dbVersion
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          const context =  JSON.parse( localStorage[dbId]  || "{}" );
          console.log(context);
          if (_.isEmpty(context) ||  context.error ) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
          }
          return true;
    }
}
