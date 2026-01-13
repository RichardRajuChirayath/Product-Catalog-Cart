import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-checkout-confirm-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
    template: `
    <div class="confirm-dialog">
        <div class="dialog-icon-box">
             <mat-icon>shopping_cart_checkout</mat-icon>
        </div>
        <h1 mat-dialog-title>Confirm Your Order</h1>
        <div mat-dialog-content>
            <p>Are you ready to finalize your purchase? Once confirmed, we'll start processing your order immediately.</p>
        </div>
        <div mat-dialog-actions align="end" style="gap: 12px; margin-top: 24px; border: none; padding-bottom: 24px;">
            <button mat-button (click)="dialogRef.close(false)" style="height: 48px; min-width: 120px;">CANCEL</button>
            <button mat-raised-button color="primary" (click)="dialogRef.close(true)" 
                style="height: 48px; min-width: 180px; border-radius: 12px; font-weight: 700;">
                CONFIRM & PAY
            </button>
        </div>
    </div>
  `,
    styles: [`
    .confirm-dialog {
        padding: 32px 24px 0;
        text-align: center;
    }
    .dialog-icon-box {
        width: 64px;
        height: 64px;
        background: rgba(99, 102, 241, 0.1);
        color: #6366f1;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
    }
    .dialog-icon-box mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
    }
    h1 {
        font-size: 24px !important;
        font-weight: 800 !important;
        margin-bottom: 8px !important;
    }
    p {
        color: var(--secondary-text);
        line-height: 1.6;
        font-size: 16px;
    }
  `]
})
export class CheckoutConfirmDialog {
    public dialogRef = inject(MatDialogRef<CheckoutConfirmDialog>);
}
