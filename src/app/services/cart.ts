import { Injectable, signal, computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private snackBar = inject(MatSnackBar);

  cartItems = signal<CartItem[]>([]);
  appliedCoupon = signal<{ code: string; discount: number } | null>(null);

  totalItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  subtotalAmount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.totalPrice, 0)
  );

  discountAmount = computed(() => {
    const coupon = this.appliedCoupon();
    if (!coupon) return 0;
    return (this.subtotalAmount() * coupon.discount) / 100;
  });

  totalAmount = computed(() =>
    this.subtotalAmount() - this.discountAmount()
  );

  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, new CartItem(product)]);
    }

    this.snackBar.open(`${product.title} added to cart`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  removeFromCart(productId: number): void {
    const item = this.cartItems().find(i => i.product.id === productId);
    this.cartItems.set(this.cartItems().filter(item => item.product.id !== productId));

    if (item) {
      this.snackBar.open(`${item.product.title} removed from cart`, 'Close', {
        duration: 3000
      });
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const items = this.cartItems();
    const item = items.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set([...items]);
    }
  }

  applyCoupon(code: string): boolean {
    const validCoupons: { [key: string]: number } = {
      'FIRST10': 10,
      'SAVE20': 20,
      'PREMIUM': 30
    };

    if (validCoupons[code.toUpperCase()]) {
      this.appliedCoupon.set({ code: code.toUpperCase(), discount: validCoupons[code.toUpperCase()] });
      this.snackBar.open(`Coupon ${code.toUpperCase()} applied!`, 'Close', { duration: 3000 });
      return true;
    } else {
      this.snackBar.open('Invalid coupon code', 'Close', { duration: 3000 });
      return false;
    }
  }

  removeCoupon(): void {
    this.appliedCoupon.set(null);
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.appliedCoupon.set(null);
    this.snackBar.open('Cart cleared', 'Close', { duration: 2000 });
  }
}
