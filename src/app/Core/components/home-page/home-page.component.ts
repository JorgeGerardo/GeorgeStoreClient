import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { Product } from '@product/interfaces/product';
import { ProductService } from '@product/services/product.service';
import { ProductCardComponent } from '@product/components/product-card/product-card.component';

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