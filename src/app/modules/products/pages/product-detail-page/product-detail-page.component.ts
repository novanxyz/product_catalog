import { ProductFormComponent } from './../../shared/product-form/product-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/product.model';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
// tslint:disable-next-line: use-host-property-decorator
  host: {'class': 'page no-footer'}
})
export class ProductDetailPageComponent implements OnInit {
  public productId: number;
  public product: Product;

  @ViewChild(ProductFormComponent)
  productForm: ProductFormComponent;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
      // this.product = new Product({ "id": 23131, "name": "test random product", "list_price": 12313.0 });
    }

  ngOnInit() {
    this.productId = parseInt( this.activatedRoute.snapshot.paramMap.get('id') );
    if ( isNaN(this.productId) ){
      return this.productForm.changeMode('new');
    }

    this.productService.getProduct(this.productId)
      .subscribe((product: Product) => {
        // console.log(product);
        this.product = product;
      });
  }

  _formSubmited(ev) {
    // console.log(ev);
    this.productForm.readOnly = true;
  }

}
