import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { inject } from "@angular/core";

export abstract class BaseService {
  URL_API = environment.apiUrl;
  http = inject(HttpClient);
}
