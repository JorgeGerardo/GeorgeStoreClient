
export interface CartItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
}

export default CartItem;