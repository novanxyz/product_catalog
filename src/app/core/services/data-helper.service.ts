import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DataHelperService {
  private static  instance = new DataHelperService();
  private  db = new IndexedDBAngular(environment.dbName, environment.dbVersion );

  static getInstance(): DataHelperService {
      if (!DataHelperService.instance) {
        return new DataHelperService();
      }
      return DataHelperService.instance;
  }

  static loadModels(modelName: string)  {
    console.log(DataHelperService.instance);
  }

  constructor() {
    this.db.createStore(1, this.createCollections);
  }

  createCollections(db) {
    db.currentTarget.result.createObjectStore('product.product');
  }

}
