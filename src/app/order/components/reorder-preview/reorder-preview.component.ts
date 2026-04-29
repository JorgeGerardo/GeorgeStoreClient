import { Component, inject, OnInit } from '@angular/core';
import { ReorderPreview } from '@order/interfaces/reorder-preview';
import { OrderService } from '@order/service/order.service';
import { OrderDetailCardComponent } from "@order/components/order-detail-card/order-detail-card.component";
import { Router } from '@angular/router';
import { AddressService } from '@profile/services/address.service';
import { PaymentMethodService } from '@profile/services/payment-method.service';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { Address } from '@profile/interfaces/address';
import { AddressSelectionComponent } from "@cart/components/address-selection/address-selection.component";
import { PaymentMethodSelectionComponent } from "@cart/components/payment-method-selection/payment-method-selection.component";
import { ProductMinimalCardComponent } from "@order/components/product-minimal-card/product-minimal-card.component";
import { ReorderRequest } from '@order/interfaces/reorder-request';

@Component({
  selector: 'app-reorder-preview',
  imports: [OrderDetailCardComponent, AddressSelectionComponent, PaymentMethodSelectionComponent, ProductMinimalCardComponent],
  templateUrl: './reorder-preview.component.html',
  styleUrl: './reorder-preview.component.scss'
})
export class ReorderPreviewComponent implements OnInit {
  router = inject(Router);
  orderService = inject(OrderService);
  addressService = inject(AddressService);
  paymentMethodService = inject(PaymentMethodService);

  selectedAddressId: number | null = null;
  selectedPaymentMethodId: number | null = null;

  reorderPreview: ReorderPreview | undefined = undefined;
  addresses: Address[] = [];
  paymentMethods: PaymentMethod[] = [];

  ngOnInit() {
    this.loadPreview();
    this.loadAddresses();
    this.loadPaymentMethods();
  }


  selectAddress(id: number) {
    this.selectedAddressId = id;
  }

  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = id;
  }

  reorder() {
    if (!this.selectedAddressId || !this.selectedPaymentMethodId || !this.reorderPreview)
      return;
    
    this.orderService.Reorder({
      AddressId: this.selectedAddressId,
      PaymentMethodId: this.selectedPaymentMethodId,
      OrderId: this.reorderPreview.orderId
    } as ReorderRequest).subscribe(res => {
      if(res > 0)
        this.router.navigate(['/', 'orders', res]);
    })

    this.router.navigate(['/', 'orders']);
  }


  private loadPreview() {
    this.orderService.PreviewReorder(1).subscribe(v => this.reorderPreview = v);
  }

  private loadPaymentMethods() {
    this.paymentMethodService.Get().subscribe((response) => {
      this.paymentMethods = response;
    });
  }

  private loadAddresses() {
    this.addressService.Get().subscribe((response) => {
      this.addresses = response;
    });
  }

}
