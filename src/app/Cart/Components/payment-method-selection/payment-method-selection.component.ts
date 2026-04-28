import { Component, input, OnInit, output } from '@angular/core';
import { PaymentMethod } from '@profile/interfaces/payment-method';

@Component({
  selector: 'app-payment-method-selection',
  imports: [],
  templateUrl: './payment-method-selection.component.html',
  styleUrl: './payment-method-selection.component.scss'
})
export class PaymentMethodSelectionComponent implements OnInit {
  selectedPaymentMethodId: number | null = null;
  paymentMethods = input.required<PaymentMethod[]>();
  paymentEvent = output<number>();
  isPaymentOpen = true;


  ngOnInit() {
    let defaultPaymentMethod = this.paymentMethods().find(p => p.isDefault)
    if(!defaultPaymentMethod) 
      return;

    this.paymentEvent.emit(defaultPaymentMethod.id);
    this.selectedPaymentMethodId = defaultPaymentMethod.id;
    this.isPaymentOpen = false;
  }

  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = id;
    this.isPaymentOpen = false;
    this.paymentEvent.emit(id);
  }

  get selectedPaymentMethod() {
    return this.paymentMethods().find(a => a.id === this.selectedPaymentMethodId);
  }

}
