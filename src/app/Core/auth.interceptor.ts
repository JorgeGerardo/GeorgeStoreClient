import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../Auth/Services/token.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(TokenService)
  const router = inject(Router)
  const token = authService.recover();;

  if(!token)
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
