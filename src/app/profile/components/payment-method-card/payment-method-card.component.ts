import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PaymentMethod } from '@profile/interfaces/payment-method';

@Component({
  selector: 'app-payment-method-card',
  imports: [DatePipe],
  templateUrl: './payment-method-card.component.html',
  styles: ``
})
export class PaymentMethodCardComponent {
  paymentMethod = input.required<PaymentMethod>();
  deleteEvent = output();
  setDefault = output();

}
