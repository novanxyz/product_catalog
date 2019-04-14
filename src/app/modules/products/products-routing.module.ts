import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { Product } from './shared/product.model';

const routes: Routes = [
  {path: Product.__plural__  , component: ProductListPageComponent},
  {path: Product.__singular__ , component: ProductDetailPageComponent},
  {path: `${Product.__singular__}/:id`, component: ProductDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
