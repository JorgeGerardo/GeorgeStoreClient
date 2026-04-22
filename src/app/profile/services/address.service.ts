import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Address, AddressCreateDto } from '@profile/interfaces/address';
import { catchError, map, of } from 'rxjs';
import { NoSpinner } from '@core/Interceptors/http.context';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  URL_API = environment.apiUrl;
  http = inject(HttpClient);

  public Add(request: AddressCreateDto){
    return this.http.post<Address[]>(`${this.URL_API}/address`, request).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  public Get(){
    return this.http.get<Address[]>(`${this.URL_API}/address`)
  }

  public Delete(addressId: number){
    return this.http.delete(`${this.URL_API}/address/${addressId}`, { context: NoSpinner() })
  }

}
