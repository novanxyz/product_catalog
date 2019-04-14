import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Product} from '../product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private router: Router) {

   }

  ngOnInit() {
  }

  goToDetail(product: Product): void {
    if (product.active) {
      this.router.navigate([ '/product/' + product.id]);
    }
  }

}
