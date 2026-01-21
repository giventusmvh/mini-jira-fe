import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent:() => import('./features/auth/pages/login').then(m => m.Login)

    },
    {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent:() => import('./features/auth/pages/register').then(m => m.Register)
    },

    //protected butuh login
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent:() => import('./features/dashboard/pages/dashboard').then(m => m.Dashboard)
    },
    {
        path:'tasks',
        canActivate: [authGuard],
        loadComponent:() => import('./features/tasks/pages/task-list').then(m => m.TaskList)
    },
    {
    path: 'categories',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./features/categories/pages/category-list').then(m => m.CategoryList)
  },
    // Fallback
  { path: '**', redirectTo: '/login' }
];
