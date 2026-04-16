import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Product } from '../../Product/interfaces/product';
import { ProductService } from '../../Product/Services/product.service';
import { ProductCardComponent } from "../../Product/product-card/product-card.component";

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent, ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit() {
    this.productService
      .GetProducts()
      .subscribe((products) => (this.products = products));
  }
}
