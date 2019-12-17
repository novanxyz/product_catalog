import { Deserializable } from "src/app/core/interfaces/deserializable.interface";

export class Category implements Deserializable {
  static __name__     = 'product.category';
  static __plural__   = 'categories';
  static __singular__ = 'category';

  id: number;
  name: string;

  static populate(category: any) {
    let catedb =  new Set( JSON.parse(localStorage[Category.__name__] || '[]') );
    catedb.add(JSON.stringify(category));
    localStorage[Category.__name__] = JSON.stringify(Array.from(catedb));
  }

  static fetch() {
    return JSON.parse(localStorage[Category.__name__]) ;
  }


  constructor(category: any) {
    if (!category) return;
    this.id   = category[0];
    this.name = category[1];
    Category.populate(category);
  }
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
}

  toJSON() {
    return [this.id, this.name];
  }

}
