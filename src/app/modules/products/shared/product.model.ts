import {Deserializable} from '../../../shared/interfaces/deserializable.interface';

export class Product implements Deserializable {
  static __name__ = 'product.product';

  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
  imageUrl: string;
  imageUrls: string[];

  constructor(product: any = {}) {
    this.id = product.id;
    this.name = product.name || '';
    this.description = product.description || '';
    this.price = product.list_price || 0;
    this.active = product.active || true;
    // tslint:disable-next-line:max-line-length
    this.imageUrl =  product.image ? `data:image/png;base64,${product.image}` : `/web/binary/image?model=${Product.__name__}&id=${product.id}&field=image`;
  }


  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
