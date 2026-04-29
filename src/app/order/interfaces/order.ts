import { OrderDetail } from "@order/interfaces/order-detail";
import { OrderStatus } from "@order/interfaces/order-status";

export interface Order {
    id: number;
    userId: string;
    dateUtc: Date;
    total: string;
    status: OrderStatus;
    details: OrderDetail[]

    //Address snapshot
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    externalNumber?: string;
    internalNumber?: string;
    references?: string;

    //payment snapshot
    cardHolderName: string;
    last4: string;
    brand: string;

}
