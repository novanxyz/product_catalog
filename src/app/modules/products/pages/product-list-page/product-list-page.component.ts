import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.model';
import { ProductService } from '../../shared/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppConfig} from '../../../../configs/app.config';
import {UtilsHelperService} from '../../../../core/services/utils-helper.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css'],
  host: {'class': 'page no-footer'}
})
export class ProductListPageComponent implements OnInit {

  products: Product[] = null;

  constructor(private productService: ProductService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Array<Product>) => {
      this.products = products.slice(0, 10);
    });
  }

}

