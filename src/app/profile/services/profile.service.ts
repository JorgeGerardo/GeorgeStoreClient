import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address, AddressCreateDto } from '@profile/interfaces/address';
import { catchError, map, of } from 'rxjs';
import { NoSpinner } from '@core/Interceptors/http.context';
import { UserData } from '@profile/interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
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

  public GetProfile(){
    return this.http.get<UserData>(`${this.URL_API}/user/profile`)
  }

  public Delete(addressId: number){
    return this.http.delete(`${this.URL_API}/address/${addressId}`, { context: NoSpinner() })
  }


}
