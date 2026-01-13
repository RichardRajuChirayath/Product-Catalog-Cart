import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';
import { Admin } from './components/admin/admin';
import { Checkout } from './components/checkout/checkout';
import { Wishlist } from './components/wishlist/wishlist';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductList },
    { path: 'product/:id', component: ProductDetail },
    { path: 'cart', component: ShoppingCart },
    { path: 'admin', component: Admin },
    { path: 'checkout', component: Checkout },
    { path: 'wishlist', component: Wishlist },
    { path: '**', redirectTo: 'products' }
];
