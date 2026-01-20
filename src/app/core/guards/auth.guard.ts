import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard untuk proteksi route yang butuh authentication.
 * Jika tidak ada token, redirect ke login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if(typeof window === 'undefined'){
    return false;
  }

  const token = localStorage.getItem('token');

  if(token){
    return true;
  }

  router.navigate(['/login']);
  return false
};
