import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../user/domain/UserModel';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { enviroment } from '../../../environments/enviroment';
import { UserRegister } from '../domain/UserRegister';
import { AuthResponse, User } from '../domain/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = enviroment.XBackEnd;

  private tokenKey = 'authToken';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  public user!: User

  constructor(private http: HttpClient) { }

  createUser(user: UserRegister): Observable<any> {
    return this.http.post(this.apiUrl + 'signup', user)
  }

  login(user?: any):Observable<AuthResponse | null> {
    if (this.isAuthenticated()) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        this.user = JSON.parse(userData);
      }
      return of(null);
    }
      return this.http.post<AuthResponse>(this.apiUrl + '/login', user).pipe(
        tap(response => {
          if (response.token) {
            if (response.token) {
              localStorage.setItem('userData', JSON.stringify(response.user))
              console.log(response.user)
              this.user = response.user;
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
    localStorage.removeItem('userData');
    this.authStatus.next(false)
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

}
