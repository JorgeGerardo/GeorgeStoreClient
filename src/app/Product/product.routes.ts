import { Routes } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductPageComponent } from './product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    children: [{ path: 'p/:id', component: ProductViewComponent }],
  },
];

export default routes;
