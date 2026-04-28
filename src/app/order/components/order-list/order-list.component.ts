import { Component, inject, OnInit } from '@angular/core';
import { Order } from '@order/interfaces/order';
import { OrderService } from '@order/service/order.service';
import { OrderComponent } from '@order/components/order/order.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { QueryParams } from '@core/Interfaces/queryparams';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  imports: [OrderComponent, NgbPagination, ReactiveFormsModule],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  orderService = inject(OrderService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  search = new FormControl('');
  paginationInf = {
    totalCount: 0,
    page: 1,
    items: [] as Order[],
    query: {
      pageSize: 3,
      offset: 0,
      term: ''
    } as QueryParams,
  };

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.paginationInf.page = +params['page'] || 1;
      this.paginationInf.query.term = params['term'] || '';
      this.search.setValue(this.paginationInf.query.term!, { emitEvent: false });
      this.paginationInf.query.offset =
        (this.paginationInf.page - 1) * this.paginationInf.query.pageSize;
      this.loadOrders();
    });
  }

  onPageChange(page: number) {
    const term = this.paginationInf.query.term;

    this.router.navigate([], {
      queryParams: {
        page,
        term: term?.trim() !== '' ? term?.trim() : null
      },
      queryParamsHandling: 'merge'
    });
  }

  write(keyEvent:KeyboardEvent){
    if (keyEvent.key !== 'Enter') return;

    const term = this.search.value ?? '';

    this.router.navigate([], {
      queryParams: {
        page: 1,
        term: term.trim() !== '' ? term.trim() : null
      },
      queryParamsHandling: 'merge'
    });
  }

  loadOrders() {
    this.orderService
      .Get(this.paginationInf.query)
      .subscribe((orders) => {
        this.paginationInf.items = orders.items;
        this.paginationInf.totalCount = orders.total;
      });
  }


}
