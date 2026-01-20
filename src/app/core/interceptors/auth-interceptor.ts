import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor untuk menambahkan JWT token ke setiap HTTP request.
 * 
 * Cara kerja:
 * 1. Ambil token dari localStorage
 * 2. Jika token ada, clone request dan tambah header Authorization
 * 3. Jika tidak ada token, lanjutkan request tanpa modifikasi
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {

    if(typeof window === 'undefined'){
      return next(req);
    }

    const token = localStorage.getItem('token');

    if(token){
      const authReq  = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${token}`)
      });
      return next(authReq);
    }

    return next(req);
  
};
