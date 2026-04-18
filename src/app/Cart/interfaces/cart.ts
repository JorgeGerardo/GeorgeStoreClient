import CartItem from "@cart/interfaces/cart.item";

export interface Cart {
    items: CartItem[];
    total: number;
}

export default Cart;