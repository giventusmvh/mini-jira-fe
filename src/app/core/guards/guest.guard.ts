import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


/**
 * Guard untuk route yang hanya boleh diakses jika BELUM login.
 * Contoh: halaman login & register
 */
export const guestGuard: CanActivateFn = () => {
    const router = inject(Router);

    if(typeof window === 'undefined'){
        return false;
    }

    const token = localStorage.getItem('token');

    if(!token){
        return true;
    }

    router.navigate(['/dashboard']);
    return false;
}