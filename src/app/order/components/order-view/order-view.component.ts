import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@order/interfaces/order';
import { OrderStatus } from '@order/interfaces/order-status';
import { OrderService } from '@order/service/order.service';
import { OrderDetailCardComponent } from "../order-detail-card/order-detail-card.component";

@Component({
  selector: 'app-order-view',
  imports: [DatePipe, NgClass, OrderDetailCardComponent],
  templateUrl: './order-view.component.html',
  styleUrl: `./order-view.component.css`,
})
export class OrderViewComponent {
  activeRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);
  order: Order | undefined = undefined;
  orderStatus = OrderStatus;

  constructor() {
    this.activeRoute.params.subscribe((params) => this.GetOrder(params['id']));
  }

  GetOrder(id: number) {
    this.orderService.GetById(id).subscribe((order) => (this.order = order));
  }

  getTotalItems(order: Order): number {
    return order.details.reduce((sum, d) => sum + d.quantity, 0);
  }

  getStatusLabel(status: number): string {
    return this.orderStatus[status];
  }
}
