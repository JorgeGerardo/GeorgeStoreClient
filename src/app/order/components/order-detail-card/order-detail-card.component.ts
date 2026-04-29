import { Component, input } from '@angular/core';
import { OrderDetail } from '@order/interfaces/order-detail';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-order-detail-card',
  imports: [RouterLink],
  templateUrl: './order-detail-card.component.html',
  styleUrl: './order-detail-card.component.scss'
})
export class OrderDetailCardComponent {
  item = input.required<OrderDetail>();

}
