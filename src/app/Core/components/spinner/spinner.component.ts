import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  template: `
    @if (spinnerState()) {
      <main class="text-center mt-5">
        <div class="spinner-border"></div>
      </main>
      <!-- <main class="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-border"></div>
      </main> -->
    }
  `,
  styles: ``
}) //TODO: No puedo elegir proyección? o algo así para los componentes hijos?
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService);
  spinnerState = toSignal(this.spinnerService.spinnerState$);

}
