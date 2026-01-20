import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, catchError } from "rxjs";


/**
 * Interceptor untuk handle error HTTP secara global.
 * 
 * - 401 Unauthorized → Redirect ke login, hapus token
 * - 403 Forbidden → Redirect ke dashboard
 * - Lainnya → Throw error untuk di-handle di component/facade
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if(error.status === 401){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.navigate(['/login']);
            }else if(error.status === 403){
                router.navigate(['/dashboard']);
            }

            return throwError(() => error);
        })
    )
}