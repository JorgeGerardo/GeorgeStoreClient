import { Component, inject } from '@angular/core';
import { SpinnerService } from '@core/services/spinner.service';

import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spinner',
  imports: [],
  template: `
    @if (spinnerState()) {
      <div class="spinner-overlay">
        <div class="spinner-border text-light"></div>
      </div>
    }
  `,
  styleUrl: `./spinner.component.css`
})
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService);
  spinnerState = toSignal(this.spinnerService.spinnerState$);

}
