import { Component, inject, input, OnInit, output } from '@angular/core';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-payment-method-selection',
  imports: [],
  templateUrl: './payment-method-selection.component.html',
  styleUrl: './payment-method-selection.component.scss'
})
export class PaymentMethodSelectionComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);

  selectedValue: number | null = null;
  paymentMethods = input.required<PaymentMethod[]>();
  selectedEvent = output<number>();
  isMenuOpen = true;


  ngOnInit() {
    let defaultPaymentMethod = this.paymentMethods().find(p => p.isDefault)
    if(!defaultPaymentMethod) 
      return;

    this.selectedEvent.emit(defaultPaymentMethod.id);
    this.selectedValue = defaultPaymentMethod.id;
    this.isMenuOpen = false;
  }

  selectPaymentMethod(id: number) {
    this.selectedValue = id;
    this.isMenuOpen = false;
    this.selectedEvent.emit(id);
  }

  get selectedPaymentMethod() {
    return this.paymentMethods().find(a => a.id === this.selectedValue);
  }

  goToCreate(){
    this.router.navigate(['/','profile', 'payment-methods', 'create'], {
      queryParams: { returnUrl: this.router.url }
    });
  }


}
