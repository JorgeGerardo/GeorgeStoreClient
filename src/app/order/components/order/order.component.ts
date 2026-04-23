import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Order } from '@order/interfaces/order';
import { OrderStatus } from '@order/interfaces/order-status';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-order',
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: `./order.component.css`
})
export class OrderComponent {
  order = input.required<Order>();
  OrderStatus = OrderStatus;

  getTotalItems(): number {
    return this.order().details.reduce((sum, d) => sum + d.quantity, 0);
  }

}
