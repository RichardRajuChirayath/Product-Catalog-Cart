import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterLink, MatCardModule, MatTooltipModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  public wishlistService = inject(WishlistService);

  product = signal<Product | undefined>(undefined);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product.set(data);
          this.loading.set(false);
          if (!data) {
            this.error.set('Product not found.');
          }
        },
        error: (err) => {
          this.error.set('Failed to load product details.');
          this.loading.set(false);
        }
      });
    } else {
      this.error.set('Invalid product ID.');
      this.loading.set(false);
    }
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct);
    }
  }

  toggleWishlist(): void {
    const p = this.product();
    if (p) {
      this.wishlistService.toggleWishlist(p);
    }
  }
}
