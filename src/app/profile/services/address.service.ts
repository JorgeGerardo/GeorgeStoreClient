import { inject, Injectable } from '@angular/core';
import { Address, AddressCreateDto } from '@profile/interfaces/address';
import { catchError, of, switchMap } from 'rxjs';
import { BaseService } from '@core/services/base.service';
import { ModalService } from '@core/services/modal.service';
import { ApiError } from '@core/Interfaces/api-error';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {
  private modalService = inject(ModalService);

  public Add(request: AddressCreateDto){
    return this.http.post<Address[]>(`${this.API_URL}/address`, request).pipe(
      switchMap(() => of(true)),
      catchError((error:HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(false);
      })
    )
  }

  public Get(){
    return this.http.get<Address[]>(`${this.API_URL}/address`)
  }

  public Delete(addressId: number){
    return this.http.delete(`${this.API_URL}/address/${addressId}`).pipe(
      switchMap(() => of(true)),
      catchError((error:HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(false);
      }),
    )
  }

  public SetAsDefault(addressId: number){
    return this.http.put(`${this.API_URL}/address/${addressId}`, {}).pipe(
      switchMap(() => of(true)),
      catchError((error:HttpErrorResponse) => {
        this.modalService.error(error.error as ApiError)
        return of(false);
      }),
    )
  }

}
