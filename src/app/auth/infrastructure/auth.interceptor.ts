import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  const authReq = token 
  ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  : req;


  return next(authReq);
};