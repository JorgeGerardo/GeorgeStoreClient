import { OrderDetail } from "@order/interfaces/order-detail";
import { OrderStatus } from "@order/interfaces/order-status";

export interface Order {
    id: number;
    userId: string;
    dateUtc: Date;
    total: string;
    status: OrderStatus;
    details: OrderDetail[]
}
