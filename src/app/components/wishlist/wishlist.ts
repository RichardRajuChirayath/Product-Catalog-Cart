import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './wishlist.html',
    styleUrl: './wishlist.css',
})
export class Wishlist {
    public wishlistService = inject(WishlistService);
    private cartService = inject(CartService);

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    removeFromWishlist(product: Product, event: Event): void {
        event.stopPropagation();
        this.wishlistService.toggleWishlist(product);
    }
}
