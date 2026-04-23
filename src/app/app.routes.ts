import { Routes } from '@angular/router';
import { HomePageComponent } from '@core/components/home-page/home-page.component';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';

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
  {
    path: 'orders',
    loadChildren: () => import('@order/oder.routes')
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
