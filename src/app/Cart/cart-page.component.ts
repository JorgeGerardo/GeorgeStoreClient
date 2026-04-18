import { Component } from '@angular/core';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { CartDetailComponent } from '@cart/components/cart-detail/cart-detail.component';
@Component({
  selector: 'app-cart-page',
  imports: [NavbarComponent, CartDetailComponent],
  template: `
    <app-navbar/>
    <app-cart-detail/>
  `,
})
export class CartPageComponent {

}
