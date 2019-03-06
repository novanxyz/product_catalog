import { ProductFormGroup } from './../product-formgroup';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { UtilsHelperService } from 'src/app/core/services/utils-helper.service';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [UtilsHelperService.fadeInOut()],

})
export class ProductFormComponent implements OnInit, OnChanges {

  readOnly: boolean = false;
  _error: string;
  _mode: string = 'view' ; // || 'edit' || 'new';
  _imgUrl: any;

  @Input() product: Product;
  productForm: ProductFormGroup = new ProductFormGroup(new Product({}));

  @Output() submited = new EventEmitter<Product>();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productForm.patchValue(this.product);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes, this.product);
    // console.log(this.productForm);
    if ( changes['product'] ) {
      this.productForm.patchValue(this.product);
      // console.log(this.productForm);
    }
  }

  changeMode(mode: string ) {
    // console.log(mode);
    this.readOnly =  mode == 'view';
    this._mode =  mode;
  }

  async submit() {
    this.product = new Product(this.productForm.value);
    // console.log(this.productForm.value, this.product);
    return this.productService.createProduct(this.product).then(e => {
        this.product.id = e;
        this.product.imageUrl = `/web/binary/image?model=${Product.__name__}&field=image&id=${e}`;
        this.submited.emit(this.product);
        this.changeMode('view');
    });
  }

  processFile(imgInput: HTMLInputElement) {

    // tslint:disable-next-line:curly
    if (imgInput.name != 'image') return;
    // tslint:disable-next-line: curly
    if (imgInput.files.length === 0)  return;

    const mimeType = imgInput.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this._error = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    reader.onload = e => { this._imgUrl = reader.result;
      this.productForm.get('image').setValue(imgInput.files[0]);
    }
    reader.readAsDataURL(imgInput.files[0]);
  }

}
