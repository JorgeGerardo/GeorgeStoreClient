import { Injectable } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { Order } from '@order/interfaces/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  Get(){
    return this.http.get<Order[]>(`${this.API_URL}/order`);
  }

  GetById(orderId: number){
    return this.http.get<Order>(`${this.API_URL}/order/${orderId}`);
  }


}

