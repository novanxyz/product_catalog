import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';


import { SharedModule } from './../../shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductCardComponent,
    ProductFormComponent,
  ]
})
export class ProductsModule { }
