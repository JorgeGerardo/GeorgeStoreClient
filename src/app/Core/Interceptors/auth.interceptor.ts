import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@auth/services/token.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SKIP_AUTH } from './http.context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(TokenService)
  const router = inject(Router)
  const token = authService.recover();;

  if(!token)
    return next(req);

  if(req.context.get(SKIP_AUTH))
    return next(req);

  let clone = req.clone({
    setHeaders: { Authorization: `Bearer ${token}`}
  })
  return next(clone).pipe(
    catchError((err:HttpErrorResponse) => {
      if(err.status === 401){
        authService.logout();
        router.navigate(['/', 'home'])
      }

      return throwError(() => err);
    })
  );
};
