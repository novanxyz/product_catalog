import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/product.model';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  public product: Product;

  constructor(private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') );
    this.productService.getProduct(productId).subscribe((product: Product) => {
      console.log(product);
      this.product = product;
    });
  }

}
