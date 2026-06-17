import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { AuthPageComponent } from '@auth/auth.page.component';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { ResetPasswordComponent } from '@auth/components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '@auth/components/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'recover', component: ResetPasswordComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

export default routes;
