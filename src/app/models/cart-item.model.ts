import { Product } from './product.model';

export class CartItem {
    constructor(
        public product: Product,
        public quantity: number = 1
    ) { }

    get totalPrice(): number {
        return this.product.price * this.quantity;
    }
}
