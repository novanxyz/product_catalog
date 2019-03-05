import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';

import { SharedModule } from './../../shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormComponent } from './shared/product-form/product-form.component';


@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductDetailPageComponent,
    ProductCardComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NoopAnimationsModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductCardComponent,
  ]
})
export class ProductsModule { }
