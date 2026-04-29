import { Component, input } from '@angular/core';
import { Product } from '@product/interfaces/product';

@Component({
  selector: 'app-product-minimal-card',
  imports: [],
  templateUrl: './product-minimal-card.component.html',
  styleUrl: './product-minimal-card.component.scss'
})
export class ProductMinimalCardComponent {
  product = input.required<Product>();
}
