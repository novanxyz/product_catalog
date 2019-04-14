import { Injectable } from '@angular/core';
import { map, catchError  } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {AppConfig} from '../../../configs/app.config';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggerService } from 'src/app/core/services/logger.service';

const serverUrl = AppConfig.serverUrl;
const cacheKey = Product.__name__ + '@' + AppConfig.dbName;
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

  fetch(): Observable<Product[]> {
    return this.http
      .get(serverUrl + this.modelUrl )
      .pipe( map(response => {
          // @ts-ignore
          const results = response.records;
          return results.map((product) => new Product(product));
        }),
        catchError ( ProductService.handleError('getProducts', []))
      );

      // .catchError ( ProductService.handleError('getProducts',[]))

  }

  get(id: Number): Observable<Product> {
    return this.http
      .get(serverUrl + this.modelUrl + id)
      .pipe(
        map(response => {
          // @ts-ignore
          const results = response.records;
          return new Product(results[0]);
        })
      );
    // .catchError ( ProductService.handleError('getProducts',[]));
  }

  create(product: Product): Promise<number> {
    return this.http
      .post(serverUrl + this.modelUrl , product)
      .pipe(
        map(response => {
          // @ts-ignore
          return response.id;
        })
      ).toPromise();
    // .catchError ( ProductService.handleError('createProducts',[]));
  }

  update(product: Product): Promise<void> {
    return this.http
      .put(serverUrl + this.modelUrl + product.id, product )
      .pipe(
        map(response => {
          // @ts-ignore
          return response.id;
        })
        // .catchError ( ProductService.handleError('updateProducts',[]));
      ).toPromise();

  }

  delete(id: number): Promise<void> {
    return this.http
      .delete(serverUrl + this.modelUrl +  id)
      .pipe(
        map(response => {
          // @ts-ignore
          return response.id;
        })
      ).toPromise();
    // .catchError ( ProductService.handleError('deleteProduct',[]));
  }

  uploadPicture(id: number, file: File, field: string = 'image'): Promise<any>  {
    let formData = new FormData();
    formData.append('file', file);
    // const headers = new HttpHeaders({"Content-Type": 'multipart/form-data'});
    return this.http
          .post(`${this.modelUrl}${field}/${id}`, formData )
          .toPromise();
  }

  updateCache(product: Product) {
    // localStorage[cacheKey];
  }
}

