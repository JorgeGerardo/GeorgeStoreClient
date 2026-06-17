import { Routes } from '@angular/router';
import { CartPageComponent } from '@cart/cart-page.component';
import { ConfirmPurchaseComponent } from '@cart/components/confirm-purchase/confirm-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: CartPageComponent,
  },
  { path: 'purchase', component: ConfirmPurchaseComponent}
];

export default routes;
