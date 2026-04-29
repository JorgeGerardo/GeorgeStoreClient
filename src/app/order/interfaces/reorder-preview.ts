import { Product } from "@product/interfaces/product";
import { OrderDetail } from "./order-detail";

export interface ReorderPreview {
    items: OrderDetail[];
    invalidItems: Product[];
    orderId: number;
    total: number;
}
