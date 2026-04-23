import { inject, Injectable } from '@angular/core';
import LoginRequest from '@auth/interfaces/LoginRequest';
import { RegisterRequest } from '@auth/interfaces/register.request';
import { catchError, map, of } from 'rxjs';
import { LoginResponse } from '@auth/interfaces/login.response';
import { TokenService } from '@auth/services/token.service';
import { BaseService } from '@core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  tokenService = inject(TokenService);

  public login(request: LoginRequest) {
    return this.http.post(`${this.API_URL}/User/login`, request).pipe(
      map((response) => {
        this.tokenService.save((response as LoginResponse).token);
        return true;
      }),
      catchError((err) =>  of(false)),
    );
  }

  public register(request: RegisterRequest) {
    return this.http.post(`${this.API_URL}/User/register`, request);
  }

}
