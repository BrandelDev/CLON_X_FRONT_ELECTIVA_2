import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../user/domain/UserModel';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { enviroment } from '../../../environments/enviroment';
import { UserRegister } from '../domain/UserRegister';
import { AuthResponse } from '../domain/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = enviroment.XBackEnd;

  private tokenKey = 'authToken';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  createUser(user: UserRegister): Observable<any> {
    return this.http.post(this.apiUrl + 'signup', user)
  }

  login(user: any): Observable<any> {
    return this.http.post<AuthResponse>(this.apiUrl + '/login', user).pipe(
      tap(response => {
        if (response.token) {
          if (response.token) {
            this.storeToken(response.token);
            this.authStatus.next(true);
          }
        }
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatus.next(false)
  }

  getAuthStatus(): Observable<boolean> { 
    return this.authStatus.asObservable();  
  }

}
