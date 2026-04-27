import { Routes } from '@angular/router';
import { ProductViewComponent } from '@product/components/product-view/product-view.component';
import { ProductPageComponent } from '@product/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [{ path: ':id', component: ProductViewComponent }],
  },
];

export default routes;
