import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, catchError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = Inject(Router);

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