import { Injectable } from '@angular/core';
import { Cart } from '@cart/interfaces/cart'
import { NoSpinner } from '@core/Interceptors/http.context';
import { CartAddDto } from '@cart/interfaces/cart.add.dto';
import { BaseService } from '@core/services/base.service';

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
    return this.http.post(`${this.API_URL}/cart`, request);
  }
}


