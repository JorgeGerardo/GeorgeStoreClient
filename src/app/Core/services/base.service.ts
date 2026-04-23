import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { inject } from "@angular/core";

export abstract class BaseService {
  API_URL = environment.apiUrl;
  http = inject(HttpClient);
}
