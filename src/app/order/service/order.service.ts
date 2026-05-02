import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseRequest } from '@cart/interfaces/purchase-request';
import { ApiError } from '@core/Interfaces/api-error';
import { PagedResult } from '@core/Interfaces/paged-result';
import { QueryParams } from '@core/Interfaces/queryparams';
import { BaseService } from '@core/services/base.service';
import { ModalService } from '@core/services/modal.service';
import { Order } from '@order/interfaces/order';
import { ReorderPreview } from '@order/interfaces/reorder-preview';
import { ReorderRequest } from '@order/interfaces/reorder-request';
import { catchError, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  private modalService = inject(ModalService);
  private router = inject(Router);

  Get(prms?: QueryParams){
    return this.http.get<PagedResult<Order>>(`${this.API_URL}/order`, {params: {...prms}});
  }

  GetById(orderId: number){
    return this.http.get<Order>(`${this.API_URL}/order/${orderId}`);
  }

  Purchase(request: PurchaseRequest){
    return this.http.post<number>(`${this.API_URL}/order`, request).pipe(
      tap((orderId) => {
        this.router.navigate(['/', 'orders', orderId]);
        return of(orderId);
      }),
      catchError((error: HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError);
        return throwError(() => error);
      })
    );
  }
  
  PreviewReorder(orderId: number){
    return this.http.get<ReorderPreview>(`${this.API_URL}/order/reorder/${orderId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError);
        this.router.navigate(['/', 'orders'])
        return throwError(() => error);
      })
    );
  }
  
  Reorder(request: ReorderRequest){
    return this.http.post<number>(`${this.API_URL}/order/reorder`, request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(-1);
      })
    );
  }

}
