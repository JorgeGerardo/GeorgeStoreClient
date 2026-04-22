import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserData } from '@profile/interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  URL_API = environment.apiUrl;
  http = inject(HttpClient);

  public Get() {
    return this.http.get<UserData>(`${this.URL_API}/user/profile`);
  }
}
