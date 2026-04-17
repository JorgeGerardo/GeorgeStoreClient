import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '@product/interfaces/product';
import { ProductService } from '@product/Services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-view',
  imports: [RouterLink],
  templateUrl: './product-view.component.html',
})
export class ProductViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  localtion = inject(Location);
  product: Product | null | undefined = undefined;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId)
      this.productService
        .GetById(productId)
        .subscribe((product) => (this.product = product));
  }

  back(){
    this.localtion.back();
  }
}
