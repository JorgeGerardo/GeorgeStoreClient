import { Injectable } from '@angular/core';
import { UserData } from '@profile/interfaces/user-data';
import { BaseService } from '@core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {

  public Get() {
    return this.http.get<UserData>(`${this.API_URL}/user/profile`);
  }
}
