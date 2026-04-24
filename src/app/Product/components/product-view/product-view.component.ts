import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '@product/interfaces/product';
import { ProductService } from '@product/services/product.service';
import { Location } from '@angular/common';
import { CartService } from '@cart/services/cart.service';
import { CartAddDto } from '@cart/interfaces/cart.add.dto';

@Component({
  selector: 'app-product-view',
  imports: [RouterLink],
  templateUrl: './product-view.component.html',
})
export class ProductViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  localtion = inject(Location);
  product: Product | null | undefined = undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId)
      this.productService
        .GetById(productId)
        .subscribe((product) => (this.product = product));
  }

  back() {
    this.localtion.back();
  }

  AddToCart(productId: number) {
    this.cartService.Add({ productId, quantity: 1 } as CartAddDto).subscribe();
  }
}
