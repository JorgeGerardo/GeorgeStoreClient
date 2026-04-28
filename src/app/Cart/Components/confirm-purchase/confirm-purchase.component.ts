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

@Component({
  selector: 'app-confirm-purchase',
  imports: [NavbarComponent, CartDetailSummaryComponent],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.scss'
})
export class ConfirmPurchaseComponent {
  router = inject(Router);
  cartService = inject(CartService);
  paymentMethodService = inject(PaymentMethodService);
  addressService = inject(AddressService);
  
  selectedAddressId: number | null = null;
  selectedPaymentMethodId: number | null = null;

  cart: Cart | undefined = undefined;
  addresses:Address[] = [];
  paymentMethods:PaymentMethod[] = []

  ngOnInit() {
    this.cartService.Get().subscribe(c => {
      if (c.items.length == 0)
        this.router.navigate(['/']);
      this.cart = c;
    });
    this.loadAddresses();
    this.loadPaymentMethods();
  }


  private loadPaymentMethods(){
    this.paymentMethodService.Get().subscribe((response) => {
      this.paymentMethods = response;
      let defaultPaymentMethod = this.paymentMethods.find(p => p.isDefault)
      if(defaultPaymentMethod)
        this.selectPaymentMethod(defaultPaymentMethod.id);
    });
  }


  private loadAddresses(){
    this.addressService.Get().subscribe((res) => (this.addresses = res));
  }

  get selectedAddress() {
    return this.addresses.find(a => a.id === this.selectedAddressId);
  }

  get selectedPaymentMethod() {
    return this.paymentMethods.find(a => a.id === this.selectedPaymentMethodId);
  }

  purchase(){
    console.log(this.selectedAddressId);
    console.log(this.selectedPaymentMethodId);
  }


  isPaymentOpen = true;

  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = id;
    this.isPaymentOpen = false;
  }

}
