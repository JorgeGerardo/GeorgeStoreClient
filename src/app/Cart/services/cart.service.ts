import { effect, inject, Injectable, signal } from '@angular/core';
import { Cart } from '@cart/interfaces/cart';
import { NoSpinner } from '@core/Interceptors/http.context';
import { CartAddDto } from '@cart/interfaces/cart.add.dto';
import { BaseService } from '@core/services/base.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { TokenService } from '@auth/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseService {
  private isLoged = inject(TokenService).isLogged;
  private _count = signal<number | undefined>(undefined);
  count = this._count.asReadonly();

  constructor() {
    super();
    effect(() => {
      if (this.isLoged())
        this.updateCount();
    });
  }

  public GetCount() {
    return this.http.get<number>(`${this.API_URL}/cart/count`, {
      context: NoSpinner(),
    });
  }

  public Get() {
    return this.http.get<Cart>(`${this.API_URL}/cart`);
  }

  public Add(request: CartAddDto) {
    return this.http.post(`${this.API_URL}/cart`, request).pipe(
      tap(() => this.updateCount()),
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  public Decrease(itemId: number) {
    return this.http.put(`${this.API_URL}/cart`, { productId: itemId }).pipe(
      tap(() => this.updateCount()),
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  public Remove(productId: number) {
    return this.http.delete(`${this.API_URL}/cart/${productId}`).pipe(
      tap(() => this.updateCount()),
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  public updateCount() {
    this.http
      .get<number>(`${this.API_URL}/cart/count`, { context: NoSpinner() })
      .subscribe((qty) => this._count.set(qty));
  }
}
