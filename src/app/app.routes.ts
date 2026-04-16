import { Routes } from '@angular/router';
import { HomePageComponent } from './Core/home-page/home-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'auth',
    loadChildren: () => import('./Auth/auth.routes'),
  },
  {
    path: 'product',
    loadChildren: () => import('./Product/product.routes'),
  },
];
