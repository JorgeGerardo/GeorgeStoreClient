import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@auth/services/token.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SKIP_AUTH } from '@core/Interceptors/http.context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(TokenService)
  const router = inject(Router)

  if(req.context.get(SKIP_AUTH))
    return next(req);

  const token = authService.recover();

  let authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`} })
    : req;
  
  return next(authReq).pipe(
    catchError((err:HttpErrorResponse) => {
      if(err.status === 401){
        authService.logout();
        router.navigate(['/', 'auth', 'login'])
      }

      return throwError(() => err);
    })
  );
};
