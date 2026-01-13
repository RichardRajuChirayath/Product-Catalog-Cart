import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Network Error: ${error.error.message}`;
            } else {
                // Server-side error
                switch (error.status) {
                    case 400: errorMessage = 'Bad Request'; break;
                    case 401: errorMessage = 'Unauthorized'; break;
                    case 403: errorMessage = 'Forbidden'; break;
                    case 404: errorMessage = 'Resource not found'; break;
                    case 500: errorMessage = 'Internal Server Error'; break;
                    default: errorMessage = `Error ${error.status}: ${error.message}`;
                }
            }

            snackBar.open(errorMessage, 'Dismiss', {
                duration: 5000,
                panelClass: ['error-snackbar'],
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });

            return throwError(() => new Error(errorMessage));
        })
    );
};
