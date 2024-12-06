import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectedUser, LoginRequestDTO, LoginResponseDTO } from '../models/auth.dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  private userKey = 'userInfo';


  currentUser = signal<ConnectedUser | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(dto: LoginRequestDTO): Observable<LoginResponseDTO> {
    return new Observable((observer) => {
      this.http.post<LoginResponseDTO>(`${environment.apiUrl}/auth/login`, dto).subscribe({
        next: (response) => {
          // Save user and tokens
          this.saveTokens(response.token.access, response.token.refresh);
          this.setCurrentUser(response.user);
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }


  logout(): void {
    this.clearStorage();
    this.currentUser.set(null);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      throw new Error('No refresh token available');
    }

    return this.http.post(`${environment.apiUrl}/auth/refresh-token`, { refreshToken });
  }

  //#region helpers
  private setCurrentUser(user: ConnectedUser): void {
    this.currentUser.set(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private clearStorage(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }
  //#endregion

}
