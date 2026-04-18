import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from '@cart/interfaces/cart'
import { NoSpinner } from '@core/Interceptors/http.context';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  API_URL = environment.apiUrl;
  http = inject(HttpClient);

  public GetCount(){
    return this.http.get<number>(`${this.API_URL}/cart/count`, {context: NoSpinner()});
  }

  public Get(){
    return this.http.get<Cart>(`${this.API_URL}/cart`);
  }

  public NoSpinner(){

  }
}


