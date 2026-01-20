import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/tokens/api-url.token';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '../../../shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/auth/login`,
      request
    );
  }

  register(request:RegisterRequest): Observable<ApiResponse<User>>{
    return this.http.post<ApiResponse<User>>(
      `${this.apiUrl}/auth/register`,
      request
    );
  }
}