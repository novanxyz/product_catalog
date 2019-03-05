import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import { UtilsHelperService } from 'src/app/core/services/utils-helper.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [UtilsHelperService.fadeInOut()]
})
export class ProductFormComponent implements OnInit {

  _readonly: boolean = true;
  _error: string;
  _mode: string = 'view';

  @Input() product: Product;
  @ViewChild('form') myNgForm; // just to call resetForm method
  productForm: FormGroup;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
  }

  changeMode(mode: string  ) {
    this._readonly =  mode == 'view';
    this._mode =  mode;
  }

  async submit() {

  }

}
