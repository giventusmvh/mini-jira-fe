import { computed, inject, Injectable, signal } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { LoginRequest, RegisterRequest, User } from "../../../shared/models";
import { catchError, EMPTY, finalize, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthFacade{
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);


    //private signals (internal states)
    private readonly _user = signal<User | null>(null);
    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);

    //public readonly signals (exposed to components)
    readonly user = this._user.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    //computed values
    readonly isAuthenticated = computed(() => !!this._user());
    readonly userName = computed(() => this._user()?.name ?? '');

    constructor(){
        this.loadUserFromStorage();
    }

    //private methods
    private loadUserFromStorage(): void{
        if(typeof window === 'undefined') return;

        const userJson = localStorage.getItem('user');
        if(userJson){
            try{
                this._user.set(JSON.parse(userJson))
            }catch{
                this.clearStorage();
            }
        }
    }

    private clearStorage(): void{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    //public actions (called by components)
    login(request: LoginRequest): void{
        this._loading.set(true);
        this._error.set(null);

        this.authService.login(request).pipe(
            tap(response => {
                if(response.success){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    this._user.set(response.data.user);
                    this.router.navigate(['/dashboard']);
                }else{
                    this._error.set(response.message);
                }
            }),
            catchError(err => {
                this._error.set(err.error?.message || 'Login failed');
                return EMPTY
            }),
            finalize(() => this._loading.set(false))
        ).subscribe();
    }

    register(request: RegisterRequest): void{
        this._loading.set(true);
        this._error.set(null);

        this.authService.register(request).pipe(
            tap(response => {
                if(response.success){
                    this.router.navigate(['/login']);
                }else{
                    this._error.set(response.message);
                }
            }),
            catchError(err => {
                this._error.set(err.error?.message || 'Register failed');
                return EMPTY;
            }),
            finalize(() => this._loading.set(false))
        ).subscribe();
    }

    logout(): void{
        this.clearStorage();
        this._user.set(null);
        this.router.navigate(['/login']);
    }



}