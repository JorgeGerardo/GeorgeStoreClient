import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '@cart/services/cart.service';
import { Cart } from '@cart/interfaces/cart';

@Component({
  selector: 'app-cart-detail',
  imports: [],
  templateUrl: './cart-detail.component.html',
})
export class CartDetailComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart | undefined = undefined;

  ngOnInit() {
    this.cartService.Get().subscribe(c => this.cart = c);
  }

}