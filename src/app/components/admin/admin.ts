import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private productService = inject(ProductService);

  categories = signal<string[]>([]);
  isLoggedIn = signal<boolean>(false);
  password = signal<string>('');
  loginError = signal<string>('');

  ngOnInit(): void {
    this.productService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }

  onLogin(): void {
    if (this.password() === 'adminsystem@123') {
      this.isLoggedIn.set(true);
      this.loginError.set('');
    } else {
      this.loginError.set('Invalid password. Access denied.');
    }
  }

  newProduct = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  onSubmit(): void {
    console.log('Product Added (Simulated):', this.newProduct);
    alert('Product added successfully (Simulation)! Check browser console.');
    // Reset form
    this.newProduct = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: ''
    };
  }
}
