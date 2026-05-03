import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@auth/services/token.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SKIP_AUTH } from '@core/Interceptors/http.context';
import { AuthService } from '@auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const authService = inject(AuthService)
  const router = inject(Router)

  if(req.context.get(SKIP_AUTH))
    return next(req);

  const token = tokenService.get();

  let authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`} })
    : req;
  
  return next(authReq).pipe(
    catchError((err:HttpErrorResponse) => {
      if (err.status === 401)
        return handle401Error(req, next, authService, tokenService, router, err);

      return throwError(() => err);
    })
  );
};


function handle401Error(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  tokenService: TokenService,
  router: Router,
  err: HttpErrorResponse
) {
  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    tokenService.removeCookies();
    router.navigate(['/auth/login']);
    return throwError(() => err);
  }

  return authService.refresh(refreshToken).pipe(
    switchMap((response) => {
      tokenService.save(response);
      const retryReq = req.clone({
        setHeaders: { Authorization: `Bearer ${response.token}` }
      });
      return next(retryReq);
    }),
    catchError(() => {
      tokenService.removeCookies();
      router.navigate(['/auth/login']);
      return throwError(() => err);
    })
  );
}

