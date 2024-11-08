import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);


  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;


  return next(authReq).pipe(
    catchError(error => {
      // Verifica si el error es 401 (no autorizado) o 403 (prohibido)
      if (error.status === 401 || error.status === 403) {
        // Redirige al usuario al login
        router.navigate(['/login']);
      }
      return throwError(error);
    }));
};
