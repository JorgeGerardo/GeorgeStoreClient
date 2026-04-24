import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { Product } from '@product/interfaces/product';
import { ProductService } from '@product/services/product.service';
import { ProductCardComponent } from '@product/components/product-card/product-card.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { QueryParams } from '@core/Interfaces/queryparams';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent, ProductCardComponent, NgbPagination],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  productService = inject(ProductService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  paginationInf = {
    totalCount: 0,
    page: 1,
    items: [] as Product[],
    query: {
      pageSize: 6,
      offset: 0,
    } as QueryParams,
  };

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.paginationInf.page = +params['page'] || 1;
      this.paginationInf.query.offset =
        (this.paginationInf.page - 1) * this.paginationInf.query.pageSize;
      this.loadProducts();
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      queryParams: { page},
      queryParamsHandling: 'merge'
    });
  }

  loadProducts() {
    this.productService
      .GetProducts(this.paginationInf.query)
      .subscribe((products) => {
        this.paginationInf.items = products.items;
        this.paginationInf.totalCount = products.total;
      });
  }
}
