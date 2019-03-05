import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Product } from './product.model';


/**  this class will handle form imput validation */
@Injectable()
export class ProductFormGroup extends FormGroup{

  constructor(product: Product) {
    const controls = {
      name: new FormControl(product.name, Validators.required),
      price: new FormControl(product.price, Validators.compose([
                        Validators.required,
                        Validators.pattern("^[0-9\.,]+$")
                    ])),
      description: new FormControl(product.description),
      imgFile: new FormControl(product.imageUrl),
    };
    super(controls);
    console.log(product, this);
  }
}
