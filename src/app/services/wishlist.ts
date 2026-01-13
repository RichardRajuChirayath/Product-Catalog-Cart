import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private wishlistItems = signal<Product[]>(this.loadFromStorage());

    readonly items = computed(() => this.wishlistItems());
    readonly totalItems = computed(() => this.wishlistItems().length);

    constructor() {
        // Persist to local storage
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
        }
    }

    toggleWishlist(product: Product): void {
        const current = this.wishlistItems();
        const exists = current.find(p => p.id === product.id);

        if (exists) {
            this.wishlistItems.set(current.filter(p => p.id !== product.id));
        } else {
            this.wishlistItems.set([...current, product]);
        }

        localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
    }

    isInWishlist(productId: number): boolean {
        return this.wishlistItems().some(p => p.id === productId);
    }

    private loadFromStorage(): Product[] {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    }
}
