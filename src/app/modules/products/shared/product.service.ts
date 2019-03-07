import { Injectable } from '@angular/core';
import { map, catchError  } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {AppConfig} from '../../../configs/app.config';

import { HttpClient } from '@angular/common/http';
import { LoggerService } from 'src/app/core/services/logger.service';

const serverUrl = AppConfig.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: Array<Product>;
  modelUrl: String = `/api/${Product.__name__}/`;

  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  constructor( private http: HttpClient ){
    //this.http.options =  httpOptions;
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get(serverUrl + this.modelUrl )
      .pipe( map(response => {
          // @ts-ignore
          const results = response.records;
          return results.map((product) => new Product(product));
        }),
        catchError ( ProductService.handleError('getProducts',[]))
      )

      //.catchError ( ProductService.handleError('getProducts',[]))

  }

  getProduct(id: Number): Observable<Product> {
    return this.http
      .get(serverUrl + this.modelUrl + id)
      .pipe(
        map(response => {
          // @ts-ignore
          const results = response.records;
          return new Product(results[0]);
        })
      )
    //.catchError ( ProductService.handleError('getProducts',[]));
  }

  createProduct(product: Product): Promise<number> {
    return this.http
      .post(serverUrl + this.modelUrl , product)
      .pipe(
        map(response => {
          // @ts-ignore
          return response.id;
        })
      ).toPromise();
    //.catchError ( ProductService.handleError('createProducts',[]));
  }

  updateProduct(product: Product): Promise<void> {
    return this.http
      .post(serverUrl + this.modelUrl + product.id, product )
      .pipe(
        map(response => {
          // @ts-ignore
          return response.id;
        })
        //,catchError ( ProductService.handleError('updateProducts',[]));
      ).toPromise();

  }

  deleteProduct(id: Number): Promise<void> {
    return this.http
      .delete(serverUrl + this.modelUrl +  id)
      .pipe(
        map(response => {
          // @ts-ignore
          return response.id;
        })
      ).toPromise();
    //.catchError ( ProductService.handleError('deleteProduct',[]));
  }

}

