import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '@core/Interfaces/queryparams';
import { Product } from '@product/interfaces/product';
import { NoAuth } from '@core/Interceptors/http.context';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlApi = environment.apiUrl;
  http = inject(HttpClient);

  public GetProducts(prms?: QueryParams){
    return this.http.get<Product[]>(`${this.urlApi}/Product`, {params: {...prms}, context: NoAuth()}); 
  }

  public GetById(id: number | string){
    return this.http.get<Product | null>(`${this.urlApi}/Product/${id}`); 
  }
}
