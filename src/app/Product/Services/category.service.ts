import { Injectable } from '@angular/core';
import { NoAuth } from '@core/Interceptors/http.context';
import { BaseService } from '@core/services/base.service';
import { Category } from '@product/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  
  public Get(){
    return this.http.get<Category[]>(`${this.API_URL}/Category`, {context: NoAuth()}); 
  }

}
