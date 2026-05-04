import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { inject } from "@angular/core";

export abstract class BaseService {
  protected API_URL = environment.apiUrl;
  protected http = inject(HttpClient);
}
