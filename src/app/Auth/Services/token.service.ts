import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  _isLogged = signal<boolean | undefined>(undefined);
  isLogged = this._isLogged.asReadonly();

  constructor() {
    if (this.recover() !== null) {
      this._isLogged.set(true);
      return;
    }
    this._isLogged.set(false);
  }

  public save(token: string) {
    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
    this._isLogged.set(true);
  }

  public recover(): string | null {
    const match = document.cookie
      .split(';')
      .find((e) => e.startsWith('token='));

    return match ? decodeURIComponent(match.split('=')[1]) : null;
  }

  public logout() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    this._isLogged.set(false);
  }
}
