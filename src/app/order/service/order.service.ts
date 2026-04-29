import { Injectable } from '@angular/core';
import { PurchaseRequest } from '@cart/interfaces/purchase-request';
import { PagedResult } from '@core/Interfaces/paged-result';
import { QueryParams } from '@core/Interfaces/queryparams';
import { BaseService } from '@core/services/base.service';
import { Order } from '@order/interfaces/order';
import { ReorderPreview } from '@order/interfaces/reorder-preview';
import { ReorderRequest } from '@order/interfaces/reorder-request';
import { catchError, of } from 'rxjs';


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

  Purchase(request: PurchaseRequest){
    return this.http.post<number>(`${this.API_URL}/order`, request).pipe(
      catchError(() => of(-1))
    );
  }

  PreviewReorder(orderId: number){
    return this.http.get<ReorderPreview>(`${this.API_URL}/order/reorder/${orderId}`);
  }

  Reorder(request: ReorderRequest){
    return this.http.post<number>(`${this.API_URL}/order/reorder`, request).pipe(
      catchError(() => of(-1))
    );
  }

}
