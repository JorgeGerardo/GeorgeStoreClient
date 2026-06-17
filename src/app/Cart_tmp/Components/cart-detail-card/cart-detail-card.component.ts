import { Component, input, output } from '@angular/core';
import CartItem from '@cart/interfaces/cart.item';

@Component({
  selector: 'app-cart-detail-card',
  imports: [],
  templateUrl: './cart-detail-card.component.html',
})
export class CartDetailCardComponent {
  item = input.required<CartItem>();
  deleteEvent = output<number>();
  increaseEvent = output<number>();
  decreaseEvent = output<number>();
  
}
