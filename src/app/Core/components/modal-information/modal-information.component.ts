import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-information',
  imports: [],
  templateUrl: './modal-information.component.html',
})
export class ModalInformationComponent {
  @Input() message = '';
  @Input() type: 'error' | 'success' | 'info' = 'info';

  activeModal = inject(NgbActiveModal);

  close() {
    this.activeModal.close();
  }
}
