import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@auth/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isLogged()) return true;

  router.navigate(['/','auth','login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
