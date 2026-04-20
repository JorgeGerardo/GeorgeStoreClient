import { Routes } from '@angular/router';
import { HomePageComponent } from '@core/components/home-page/home-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.routes'),
  },
  {
    path: 'product',
    loadChildren: () => import('@product/product.routes'),
  },
  {
    path: 'cart',
    loadChildren: () => import('@cart/cart.routes'),
  },
  {
    path: 'profile',
    loadChildren: () => import('@profile/profile.routes')
  },
];
