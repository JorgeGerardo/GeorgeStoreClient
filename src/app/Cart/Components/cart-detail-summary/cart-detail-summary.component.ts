import { Component, input } from '@angular/core';
import CartItem from '@cart/interfaces/cart.item';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart-detail-summary',
  imports: [RouterLink],
  templateUrl: './cart-detail-summary.component.html',
  styleUrl: './cart-detail-summary.component.scss'
})
export class CartDetailSummaryComponent {
  item = input.required<CartItem>();
}
