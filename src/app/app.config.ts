import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@core/Interceptors/auth.interceptor';
import { spinnerInterceptor } from '@core/Interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([spinnerInterceptor, authInterceptor])),
    provideRouter(routes),
  ],
};
