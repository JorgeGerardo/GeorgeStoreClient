import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import LoginRequest from '../Interfaces/LoginRequest';
import { RegisterRequest } from '../Interfaces/register.request';
import { catchError, map, of } from 'rxjs';
import { LoginResponse } from '../Interfaces/login.response';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  urlApi = environment.apiUrl;

  public login(request: LoginRequest) {
    return this.http.post(`${this.urlApi}/User/login`, request).pipe(
      map((response) => {
        this.tokenService.save((response as LoginResponse).token);
        return true;
      }),
      catchError((err) =>  of(false)),
    );
  }

  public register(request: RegisterRequest) {
    return this.http.post(`${this.urlApi}/User/register`, request);
  }

}
