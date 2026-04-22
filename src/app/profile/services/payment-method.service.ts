import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { PaymentMethodCreateDto } from '@profile/interfaces/payment-method-create-dto';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  URL_API = environment.apiUrl;
  http = inject(HttpClient);

  constructor() { }

  public Get(){
    return this.http.get<PaymentMethod[]>(`${this.URL_API}/PaymentMethod`);
  }

  public Add(request: PaymentMethodCreateDto){
    return this.http.post(`${this.URL_API}/PaymentMethod`, request).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }


  public SetAsDefault(paymentMethodId: number){
    return this.http.put(`${this.URL_API}/PaymentMethod/${paymentMethodId}`, {}).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  public Remove(paymentMethodId: string | number){
    return this.http.delete(`${this.URL_API}/PaymentMethod/${paymentMethodId}`).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
