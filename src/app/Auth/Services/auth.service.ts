import { inject, Injectable } from '@angular/core';
import LoginRequest from '@auth/interfaces/LoginRequest';
import { RegisterRequest } from '@auth/interfaces/register.request';
import { catchError, finalize, map, of } from 'rxjs';
import { LoginResponse } from '@auth/interfaces/login.response';
import { TokenService } from '@auth/services/token.service';
import { BaseService } from '@core/services/base.service';
import { NoAuth } from '@core/Interceptors/http.context';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private tokenService = inject(TokenService);

  public login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API_URL}/User/login`, request).pipe(
      map((response) => {
        this.tokenService.save(response);
        return true;
      }),
      catchError((err) =>  of(false)),
    );
  }

  public register(request: RegisterRequest) {
    return this.http.post(`${this.API_URL}/User/register`, request);
  }

  public refresh(refreshToken: string){
    return this.http.post<LoginResponse>(`${this.API_URL}/User/refresh`, {refreshToken}, {context: NoAuth()});
  }

  public logout(){
    let refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      this.tokenService.removeCookies();
      return of();
    }

    return this.http.post(`${this.API_URL}/User/logout`, {refreshToken}, {context: NoAuth()}).pipe(
      finalize(() => this.tokenService.removeCookies())
    )
  }

}
