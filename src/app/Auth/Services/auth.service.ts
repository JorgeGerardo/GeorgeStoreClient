import { inject, Injectable } from '@angular/core';
import LoginRequest from '@auth/interfaces/LoginRequest';
import { RegisterRequest } from '@auth/interfaces/register.request';
import { catchError, finalize, map, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '@auth/interfaces/login.response';
import { TokenService } from '@auth/services/token.service';
import { BaseService } from '@core/services/base.service';
import { NoAuth } from '@core/Interceptors/http.context';
import { ResetPassowordRequest } from '@auth/interfaces/reset-password-request';
import { ModalService } from '@core/services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '@core/Interfaces/api-error';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private tokenService = inject(TokenService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  public login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API_URL}/Auth/login`, request).pipe(
      map((response) => {
        this.tokenService.save(response);
        return true;
      }),
      catchError((err:HttpErrorResponse) => {
        this.modalService.error(err.error as ApiError);
        return of(false);
      })
    );
  }

  public register(request: RegisterRequest) {
    return this.http.post(`${this.API_URL}/Auth/register`, request);
  }

  public refresh(refreshToken: string){
    return this.http.post<LoginResponse>(`${this.API_URL}/Auth/refresh`, {refreshToken}, {context: NoAuth()});
  }

  public logout(){
    let refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      this.tokenService.removeCookies();
      return of();
    }

    return this.http.post(`${this.API_URL}/Auth/logout`, {refreshToken}, {context: NoAuth()}).pipe(
      finalize(() => this.tokenService.removeCookies())
    )
  }

  public forgotPassword(email: string){
    return this.http.post(`${this.API_URL}/password-recovery`, {email}, {context: NoAuth()});
  }

  public resetPassword(request: ResetPassowordRequest){
    return this.http.post(`${this.API_URL}/password-recovery/recover`, request, {context: NoAuth()}).pipe(
      tap(() => {
        this.modalService.success("Password has been reseted, try login again")
        this.router.navigate(['/', 'auth', 'login'])
      }),
      catchError((err:HttpErrorResponse) => {
        this.modalService.error(err.error as ApiError);
        return throwError(() => err);
      })
    );
  }

}
