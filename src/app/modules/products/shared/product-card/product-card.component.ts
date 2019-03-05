import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
    const productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getProduct(productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  goToDetail(product: Product) : void{
    if (product.active) {
      this.router.navigate([ '/product/' + product.id]);
    }
  }

}
