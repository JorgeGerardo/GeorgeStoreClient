import { Component, inject, input } from '@angular/core';
import { Product } from '@product/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '@cart/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  cartService = inject(CartService);
  product = input.required<Product>();

  addToCart(productId: number) {
    this.cartService.Add({ productId, quantity: 1 }).subscribe();
  }
}
