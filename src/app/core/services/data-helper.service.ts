import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IndexedDBAngular } from 'indexeddb-angular/dist/index';


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
    this.db.createStore( 1 , this.createCollections);
  }

  createCollections( db, collection ) {
    db.currentTarget.result.createObjectStore(collection);
  }

  createCollection(collection: string){
    // this.db.createObjectStore(collection);
  }

  inserts(collection: string, records:any){
    console.log(records)
    records.map( r => this.add(collection,r) );
  }

  add(collection: string, data:any ) {
    console.log(data);
  }
  find(collection: string, id: any) {

  }
  load(collection: string, sample: any ) {

  }

  delete(collection:string,id:any){

  }
  clear(collection: string){

  }


}
