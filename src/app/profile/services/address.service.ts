import { Injectable } from '@angular/core';
import { Address, AddressCreateDto } from '@profile/interfaces/address';
import { catchError, map, of, switchMap } from 'rxjs';
import { NoSpinner } from '@core/Interceptors/http.context';
import { BaseService } from '@core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {

  public Add(request: AddressCreateDto){
    return this.http.post<Address[]>(`${this.API_URL}/address`, request).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  public Get(){
    return this.http.get<Address[]>(`${this.API_URL}/address`)
  }

  public Delete(addressId: number){
    return this.http.delete(`${this.API_URL}/address/${addressId}`)
  }

  public SetAsDefault(addressId: number){
    return this.http.put(`${this.API_URL}/address/${addressId}`, {}).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    )
  }

}
