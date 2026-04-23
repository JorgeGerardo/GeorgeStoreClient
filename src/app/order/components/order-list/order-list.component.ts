import { Component, inject, OnInit } from '@angular/core';
import { Order } from '@order/interfaces/order';
import { OrderService } from '@order/service/order.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-order-list',
  imports: [OrderComponent],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit() {
    this.orderService.Get().subscribe((orders) => (this.orders = orders));
  }
}
