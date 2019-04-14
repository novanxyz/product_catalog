import { ProductFormGroup } from './../product-formgroup';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { UtilsHelperService } from 'src/app/core/services/utils-helper.service';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/configs/app.config';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [UtilsHelperService.fadeInOut()],

})
export class ProductFormComponent implements OnInit, OnChanges {

  readOnly: boolean = true;
  _error: string;
  _mode: string = 'view' ; // || 'edit' || 'new';
  _imgUrl: any;

  @Input() product: Product;
  productForm: ProductFormGroup = new ProductFormGroup(new Product({}));

  @Output() changed = new EventEmitter<any>();


  @ViewChild('imgPreview')
  imgPreview: HTMLImageElement;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.productForm.patchValue(this.product);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes, this.product);
    // console.log(this.productForm);
    if ( changes['product'] ) {
      this.productForm.patchValue(this.product);
      // console.log(this.productForm);
    }
  }

  changeMode(mode: string ) {
    this.readOnly =  mode == 'view' ;
    this._mode =  mode;
  }

  async submit() {
    // this.product = new Product(this.productForm.value);
    console.log(this.productForm.value, this.product);
    if (this.product.id ) {
      return this.productService.update(this.productForm.value).then(e => {
        this.changed.emit( ["updated", this.product] );
        this.changeMode('view');
      });

    }
    return this.productService.create(this.productForm.value ).then(e => {
        this.product.id = e;
        this.changed.emit( ["created", this.product] );
        this.changeMode('view');
    });
  }

  async delete(){
    if (this.product.id) {
      return this.productService.delete(this.product.id)
        .then( e=> {
          this.changed.emit( ["deleted", this.product ] );
          this.changeMode('view');
          })
    }
    return new PromiseRejectionEvent("No Id Supplied", null);
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
    reader.onload = e => {
      // @ts-ignore
      this.imgPreview.nativeElement.src = reader.result;
      this.productForm.get('image').setValue(imgInput.files[0]);
    };
    reader.readAsDataURL(imgInput.files[0]);
  }

}
