import { inject, Injectable } from '@angular/core';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { PaymentMethodCreateDto } from '@profile/interfaces/payment-method-create-dto';
import { catchError, of, switchMap } from 'rxjs';
import { BaseService } from '@core/services/base.service';
import { ModalService } from '@core/services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '@core/Interfaces/api-error';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService {
  private modalService = inject(ModalService);

  public Get(){
    return this.http.get<PaymentMethod[]>(`${this.API_URL}/PaymentMethod`);
  }

  public Add(request: PaymentMethodCreateDto){
    return this.http.post(`${this.API_URL}/PaymentMethod`, request).pipe(
      switchMap(() => of(true)),
      catchError((error:HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(false);
      }),
    );
  }
  
  
  public SetAsDefault(paymentMethodId: number){
    return this.http.put(`${this.API_URL}/PaymentMethod/${paymentMethodId}`, {}).pipe(
      switchMap(() => of(true)),
      catchError((error:HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(false);
      }),
    );
  }
  
  public Remove(paymentMethodId: string | number){
    return this.http.delete(`${this.API_URL}/PaymentMethod/${paymentMethodId}`).pipe(
      switchMap(() => of(true)),
      catchError((error:HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(false);
      }),
    );
  }
}
