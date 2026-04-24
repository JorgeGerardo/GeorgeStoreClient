import { Injectable } from '@angular/core';
import { Cart } from '@cart/interfaces/cart'
import { NoSpinner } from '@core/Interceptors/http.context';
import { CartAddDto } from '@cart/interfaces/cart.add.dto';
import { BaseService } from '@core/services/base.service';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
  public GetCount(){
    return this.http.get<number>(`${this.API_URL}/cart/count`, {context: NoSpinner()});
  }

  public Get(){
    return this.http.get<Cart>(`${this.API_URL}/cart`);
  }

  public Add(request: CartAddDto){
    return this.http.post(`${this.API_URL}/cart`, request).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  public Decrease(itemId: number){
    return this.http.put(`${this.API_URL}/cart`, {"productId": itemId}).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  public Remove(productId: number){
    return this.http.delete(`${this.API_URL}/cart/${productId}`).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}


