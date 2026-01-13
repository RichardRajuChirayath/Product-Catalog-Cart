import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { Product } from '../../models/product.model';
import { HighlightDiscountDirective } from '../../directives/highlight-discount';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    RouterLink,
    HighlightDiscountDirective
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  public productService = inject(ProductService);
  private cartService = inject(CartService);
  public wishlistService = inject(WishlistService);

  private rawProducts = signal<Product[]>([]);
  categories = signal<string[]>(['All']);
  searchText = signal('');
  selectedCategory = signal('All');
  sortBy = signal('default');
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed signal for filtered and sorted products
  filteredProducts = computed(() => {
    let list = [...this.rawProducts()];

    // 1. Category Filter
    if (this.selectedCategory() !== 'All') {
      list = list.filter(p => p.category === this.selectedCategory());
    }

    // 2. Search Filter
    if (this.searchText()) {
      const search = this.searchText().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // 3. Sorting
    switch (this.sortBy()) {
      case 'price-low': list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); break;
    }

    return list;
  });

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.rawProducts.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products. Please try again later.');
        this.loading.set(false);
      }
    });

    this.productService.getCategories().subscribe(cats => {
      this.categories.set(['All', ...cats]);
    });

    this.productService.search$.subscribe(term => {
      this.searchText.set(term);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: Product, event: Event): void {
    event.stopPropagation();
    this.wishlistService.toggleWishlist(product);
  }
}
