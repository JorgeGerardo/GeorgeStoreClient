import { inject, Injectable } from '@angular/core';
import { ModalInformationComponent } from '@core/components/modal-information/modal-information.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modal = inject(NgbModal);

  error(message: string) {
    const ref = this.modal.open(ModalInformationComponent, {
      centered: true,
      backdrop: 'static',
    });

    ref.componentInstance.message = message;
    ref.componentInstance.type = 'error';

    return ref;
  }

  success(message: string) {
    const ref = this.modal.open(ModalInformationComponent, {
      centered: true,
    });

    ref.componentInstance.message = message;
    ref.componentInstance.type = 'success';

    return ref;
  }

  info(message: string) {
    const ref = this.modal.open(ModalInformationComponent, {
      centered: true,
    });

    ref.componentInstance.message = message;
    ref.componentInstance.type = 'info';

    return ref;
  }
}
