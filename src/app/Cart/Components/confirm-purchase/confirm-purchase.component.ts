import { Component, inject } from '@angular/core';
import Cart from '@cart/interfaces/cart';
import { CartService } from '@cart/services/cart.service';
import { NavbarComponent } from "@core/components/navbar/navbar.component";
import { CartDetailSummaryComponent } from "@cart/components/cart-detail-summary/cart-detail-summary.component";
import { Router } from '@angular/router';
import { PaymentMethod } from '@profile/interfaces/payment-method';
import { PaymentMethodService } from '@profile/services/payment-method.service';
import { AddressService } from '@profile/services/address.service';
import { Address } from '@profile/interfaces/address';
import { PaymentMethodSelectionComponent } from "@cart/components/payment-method-selection/payment-method-selection.component";
import { AddressSelectionComponent } from "@cart/components/address-selection/address-selection.component";
import { OrderService } from '@order/service/order.service';

@Component({
  selector: 'app-confirm-purchase',
  imports: [NavbarComponent, CartDetailSummaryComponent, PaymentMethodSelectionComponent, AddressSelectionComponent],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.scss'
})
export class ConfirmPurchaseComponent {
  router = inject(Router);
  cartService = inject(CartService);
  paymentMethodService = inject(PaymentMethodService);
  addressService = inject(AddressService);
  orderService = inject(OrderService);
  
  selectedAddressId: number | null = null;
  selectedPaymentMethodId: number | null = null;

  cart: Cart | undefined = undefined;
  addresses:Address[] = [];
  paymentMethods:PaymentMethod[] = []

  ngOnInit() {
    this.loadCart();
    this.loadAddresses();
    this.loadPaymentMethods();
  }

  purchase(){
    if(!this.selectedAddressId || !this.selectedPaymentMethodId || !this.cart?.id)
      return;

    this.orderService.Purchase({
      addressId: this.selectedAddressId,
      cartId: this.cart?.id,
      paymentMethodId: this.selectedPaymentMethodId
    }).subscribe(orderId => {
      if(orderId)
        this.router.navigate(['/', 'orders', orderId])
    })
  }



  selectAddress(id: number){
    this.selectedAddressId = id;
  }

  selectPaymentMethod(id: number){
    this.selectedPaymentMethodId = id;
  }

  private loadCart(){
    this.cartService.Get().subscribe(c => {
      if (c.items.length == 0)
        this.router.navigate(['/']);
      this.cart = c;
    });
  }

  private loadPaymentMethods(){
    this.paymentMethodService.Get().subscribe((response) => this.paymentMethods = response);
  }

  private loadAddresses(){
    this.addressService.Get().subscribe((res) => (this.addresses = res));
  }

}
