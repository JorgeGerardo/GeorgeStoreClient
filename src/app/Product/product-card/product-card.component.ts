import { Component, input } from '@angular/core';
import { Product } from '../interfaces/product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();  
}
