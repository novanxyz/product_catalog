import { FormControl } from '@angular/forms';
import { ProductFormGroup } from './../product-formgroup';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import { UtilsHelperService } from 'src/app/core/services/utils-helper.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [UtilsHelperService.fadeInOut()]
})
export class ProductFormComponent implements OnInit {

  _readonly: boolean = false;
  _error: string;
  _mode: string = 'view' ; // || 'edit' || 'new';
  _imgUrl: any;

  @Input() product: Product;
  @ViewChild('form') myNgForm; // just to call resetForm method
  productForm: ProductFormGroup;

  @Output() submited = new EventEmitter<Product>();

  constructor(private productService: ProductService) {
    console.log("constructor", this.product);
    this.productForm = new ProductFormGroup(new Product({}));
  }

  ngOnInit() {
    this.productForm.patchValue(this.product);
  }

  changeMode(mode: string ) {
    this._readonly =  mode == 'view';
    this._mode =  mode;
  }

  async submit() {
    this.product = new Product(this.productForm.value);
    console.log(this.productForm.value, this.product);
    return this.productService.createProduct(this.product).then(e => {
        this.product.id = e;
        this.product.imageUrl = `/web/binary/image?model=${Product.__name__}&id=${e}&field=image`;
        this.submited.emit(this.product);
    });
  }

  goEdit() {
    this._readonly = false;
  }
  goCancel() {
    this._readonly = true;
  }
  processFile(imgInput: HTMLInputElement) {

    // tslint:disable-next-line:curly
    if (imgInput.name != 'image') return;
    if (imgInput.files.length === 0)  return;

    const mimeType = imgInput.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this._error = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    reader.onload = e => { this._imgUrl = reader.result;
      this.productForm.get('imgFile').setValue(imgInput.files[0]);
    }
    reader.readAsDataURL(imgInput.files[0]);
  }

}
