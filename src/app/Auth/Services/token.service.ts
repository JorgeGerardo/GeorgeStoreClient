import { Injectable, signal } from '@angular/core';
import LoginResponse from '@auth/interfaces/login.response';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _isLogged = signal<boolean | undefined>(undefined);
  isLogged = this._isLogged.asReadonly();

  constructor() {
    if (this.get() !== null) {
      this._isLogged.set(true);
      return;
    }
    this._isLogged.set(false);
  }

  public save(token: LoginResponse) {
    document.cookie = `token=${token.token}; path=/; Secure; SameSite=Strict`;
    document.cookie = `refreshToken=${token.refreshToken}; path=/; Secure; SameSite=Strict`;
    this._isLogged.set(true);
  }

  public get(): string | null {
    const match = document.cookie
      .split(';')
      .find((e) => e.trim().startsWith('token='));

    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  public removeCookies() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    this._isLogged.set(false);
  }

  public getRefreshToken(): string | null {
    const match = document.cookie
      .split(';')
      .find((e) => e.trim().startsWith('refreshToken='));

    if (!match) return null;

    return match.trim().substring('refreshToken='.length);
  }
}
