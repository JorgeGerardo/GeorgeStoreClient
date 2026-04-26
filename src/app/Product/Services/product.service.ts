import { Injectable } from '@angular/core';
import { QueryParams } from '@core/Interfaces/queryparams';
import { Product } from '@product/interfaces/product';
import { NoAuth } from '@core/Interceptors/http.context';
import { BaseService } from '@core/services/base.service';
import { PagedResult } from '@core/Interfaces/paged-result';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  public Get(prms?: QueryParams){
    return this.http.get<PagedResult<Product>>(`${this.API_URL}/Product`, {params: {...prms}, context: NoAuth()}); 
  }

  public GetById(id: number | string){
    return this.http.get<Product | null>(`${this.API_URL}/Product/${id}`); 
  }

}
