import { Injectable } from '@angular/core';
import { QueryParams } from '@core/Interfaces/queryparams';
import { Product } from '@product/interfaces/product';
import { NoAuth } from '@core/Interceptors/http.context';
import { BaseService } from '@core/services/base.service';
import { HttpParams } from '@angular/common/http';
import { PagedResult } from '@core/Interfaces/paged-result';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  public GetProducts(prms?: QueryParams){
    return this.http.get<PagedResult<Product>>(`${this.API_URL}/Product`, {params: {...prms}, context: NoAuth()}); 
  }

  public GetById(id: number | string){
    return this.http.get<Product | null>(`${this.API_URL}/Product/${id}`); 
  }


  private BuildQueries(params: QueryParams | null = null){
    let httpParams = new HttpParams();

    if (params) {
      if (params.pageSize !== undefined)
        httpParams = httpParams.set('pageSize', params.pageSize);

      if (params.offset !== undefined)
        httpParams = httpParams.set('offset', params.offset);

      if (params.term)
        httpParams = httpParams.set('term', params.term);
    }

    return httpParams;
  }

}
