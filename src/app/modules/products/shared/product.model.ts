import { Deserializable } from "src/app/core/interfaces/deserializable.interface";
import { Category } from "./category.model";
import { FileHelperService } from "src/app/core/services/file-helper.service";

export class Product implements Deserializable {
  static __name__     = 'product.product';
  static __plural__   = 'products';
  static __singular__ = 'product';

  id: number;
  name: string;
  description: string;
  category: Category ;
  price: number;
  active: boolean;
  image: string;

  constructor(product: any = {}) {
    this.id = product.id;
    this.name = product.name || '';
    this.description = product.description || '';
    this.price = product.list_price || product.price || 0;
    this.active = product.active || true;
    this.image = product.image;
    this.category = new Category(product.categ_id);
    FileHelperService.saveBase64(`/${Product.__name__}/${product.id}/image.png`,product.image );
  }

  get imageUrl(): string {
    return this.image ? `data:image/png;base64,${this.image}` : `/web/binary/image?model=${Product.__name__}&field=image&id=${this.id}`;
  }

  get imageUrls(): string[] {
    return [];
  }


  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  toJSON() {
// tslint:disable-next-line: prefer-const
    let ret = Object.assign({}, this);
    ret['list_price'] = this.price;
    return ret;
  }
}
