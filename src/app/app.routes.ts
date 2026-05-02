import { Routes } from '@angular/router';
import { HomePageComponent } from '@core/components/home-page/home-page.component';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
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
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('@profile/profile.routes'),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadChildren: () => import('@order/oder.routes'),
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
