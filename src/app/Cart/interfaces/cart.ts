import CartItem from "@cart/interfaces/cart.item";

export interface Cart {
    id: number;
    items: CartItem[];
    total: number;
}

export default Cart;