import { Injectable } from '@angular/core';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { PaymentMethodCreateDto } from '@profile/interfaces/payment-method-create-dto';
import { catchError, of, switchMap } from 'rxjs';
import { BaseService } from '@core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService {

  public Get(){
    return this.http.get<PaymentMethod[]>(`${this.API_URL}/PaymentMethod`);
  }

  public Add(request: PaymentMethodCreateDto){
    return this.http.post(`${this.API_URL}/PaymentMethod`, request).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }


  public SetAsDefault(paymentMethodId: number){
    return this.http.put(`${this.API_URL}/PaymentMethod/${paymentMethodId}`, {}).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  public Remove(paymentMethodId: string | number){
    return this.http.delete(`${this.API_URL}/PaymentMethod/${paymentMethodId}`).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
