import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@core/services/spinner.service';
import { finalize } from 'rxjs';
import { SKIP_SPINNER } from '@core/Interceptors/http.context';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  if(req.context.get(SKIP_SPINNER))
    return next(req);

  spinnerService.Show();
  return next(req).pipe(finalize(() => spinnerService.Hide()));
};

