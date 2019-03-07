import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DataHelperService {
  static private instance = new DataHelperService();
  private  db = new IndexedDBAngular(environment.dbName, environment.dbVersion );

  constructor() {
    this.db.createStore(1, this.createCollections);
  }

  createCollections(db) {
    db.currentTarget.result.createObjectStore('product.product');
  }

  static loadModels(modelName: string)  {
    console.log(DataHelperService.instance);
  }


}
