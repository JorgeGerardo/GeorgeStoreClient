import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthPageComponent } from './auth.page.component';
import { NotFoundComponent } from '../Core/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

export default routes;
