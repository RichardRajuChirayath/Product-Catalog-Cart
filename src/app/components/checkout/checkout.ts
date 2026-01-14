import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CheckoutConfirmDialog } from '../checkout-confirm-dialog/checkout-confirm-dialog';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    RouterLink
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private fb = inject(FormBuilder);
  protected cartService = inject(CartService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  orderSuccess = signal(false);
  trackingStep = signal(0);
  orderNumber = signal('');

  customerInfo = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
  });

  shippingInfo = this.fb.group({
    address: ['', [Validators.required, Validators.minLength(10)]],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]],
  });

  checkoutForm = this.fb.group({
    customer: this.customerInfo,
    shipping: this.shippingInfo
  });

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const dialogRef = this.dialog.open(CheckoutConfirmDialog, {
        width: '450px'
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.orderNumber.set('ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
          this.cartService.clearCart();
          this.orderSuccess.set(true);
          this.startTrackingSimulation();
        }
      });
    }
  }

  startTrackingSimulation(): void {
    // Stage 0: Order Placed (Default)

    // Stage 1: Processing (after 2s)
    setTimeout(() => this.trackingStep.set(1), 2000);

    // Stage 2: Quality Check (after 5s)
    setTimeout(() => this.trackingStep.set(2), 5000);

    // Stage 3: Out for Delivery (after 8s)
    setTimeout(() => this.trackingStep.set(3), 8000);
  }
}
