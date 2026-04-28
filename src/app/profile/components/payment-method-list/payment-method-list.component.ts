import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { PaymentMethodService } from '@profile/services/payment-method.service';
import { PaymentMethodCardComponent } from '@profile/components/payment-method-card/payment-method-card.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-payment-method-list',
  imports: [CommonModule, PaymentMethodCardComponent, RouterLink],
  templateUrl: './payment-method-list.component.html',
  styles: ``,
})
export class PaymentMethodListComponent implements OnInit {
  paymentMethodService = inject(PaymentMethodService);
  paymentMethods: PaymentMethod[] = [];
  
  ngOnInit() {
    this.loadPaymentMethods();
  }

  delete(id: number){
    this.paymentMethodService.Remove(id).subscribe(v => {
      if (v)
        this.paymentMethods = this.paymentMethods.filter(p => p.id !== id)
    });
  }

  setAsDefault(id: number){
    this.paymentMethodService.SetAsDefault(id).subscribe(v => {
      if (v)
        this.loadPaymentMethods();
    });

  }

  private loadPaymentMethods(){
    this.paymentMethodService.Get().subscribe((response) => this.paymentMethods = response);
  }
}
