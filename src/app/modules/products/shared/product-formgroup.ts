import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Product } from './product.model';


/**  this class will handle form input validations */
@Injectable()
export class ProductFormGroup extends FormGroup {

  constructor(product: Product) {
    const controls = {
      name: new FormControl(product.name, Validators.required),
      price: new FormControl(product.price, Validators.compose([
                        Validators.required,
                        Validators.pattern("^[0-9\.,]+$")
                    ])),
      description: new FormControl(product.description, Validators.required ),
      image: new FormControl(product.imageUrl, ),
    };
    super(controls);
  }
  setValue(product: Product) {
    console.log("set value", product, product.toJSON());
    super.setValue(product.toJSON());
  }
  patchValue(product: Product) {
// tslint:disable-next-line: no-console
    console.trace();
    console.log("patch value", product, product.toJSON());
    super.patchValue(product.toJSON());
  }
}
