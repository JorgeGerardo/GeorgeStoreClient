import { Injectable } from '@angular/core';
import { PagedResult } from '@core/Interfaces/paged-result';
import { QueryParams } from '@core/Interfaces/queryparams';
import { BaseService } from '@core/services/base.service';
import { Order } from '@order/interfaces/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  Get(prms?: QueryParams){
    return this.http.get<PagedResult<Order>>(`${this.API_URL}/order`, {params: {...prms}});
  }

  GetById(orderId: number){
    return this.http.get<Order>(`${this.API_URL}/order/${orderId}`);
  }


}

