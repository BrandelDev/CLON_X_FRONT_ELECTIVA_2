import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../user/domain/UserModel';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/enviroment';
import { UserRegister } from '../domain/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = enviroment.XBackEnd;

  constructor(private http: HttpClient) { }

  createUser(user:UserRegister):Observable<any> {
    return this.http.post(this.apiUrl + 'signup', user)
   }

}
