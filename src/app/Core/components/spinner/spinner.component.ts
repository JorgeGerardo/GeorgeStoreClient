import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
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
