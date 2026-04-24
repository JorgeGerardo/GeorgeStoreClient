import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '@cart/services/cart.service';
import { Cart } from '@cart/interfaces/cart';
import { CartDetailCardComponent } from "@cart/components/cart-detail-card/cart-detail-card.component";

@Component({
  selector: 'app-cart-detail',
  imports: [CartDetailCardComponent],
  templateUrl: './cart-detail.component.html',
})
export class CartDetailComponent implements OnInit {
  cartService = inject(CartService);
  cart: Cart | undefined = undefined;

  ngOnInit() {
    this.cartService.Get().subscribe(c => this.cart = c);
  }

  remove(itemId: number){
    this.cartService.Remove(itemId).subscribe(v => {
      if(!v || !this.cart)
        return;
      this.cart.items = this.cart?.items.filter(i => i.productId !== itemId);
      this.updateCartTotal();
    });
  }

  increase(itemId: number){
    this.cartService.Add({productId: itemId, quantity: 1}).subscribe(v => {
      if(!this.cart) return;
      let item = this.cart.items.find(i => i.productId === itemId);
      if (item)
        item.quantity++;
      this.updateCartTotal();
    })
  }

  decrease(itemId: number){
    this.cartService.Decrease(itemId).subscribe(v => {
      if(!this.cart || !v) return;
      let item = this.cart.items.find(i => i.productId === itemId);
      if (item)
        item.quantity--;
      this.updateCartTotal();
    })
  }

  private updateCartTotal(){
    if(!this.cart) return;
    this.cart.total = this.cart.items.reduce((acc, item) => (acc + item.price * item.quantity), 0)
  }
}