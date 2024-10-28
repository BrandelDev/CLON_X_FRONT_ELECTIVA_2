import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroment';
import { User } from '../../auth/domain/Auth';
import { UserFollow } from '../domain/UserFollow';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = enviroment.XBackEnd;

  constructor(private http: HttpClient) {
  }

  getCountFollowers(userId: string) {
    return this.http.get(this.apiUrl + '/users/' + userId + '/followers/count');
  }

  getCountFollowing(userId: string) {
    return this.http.get(this.apiUrl + '/users/' + userId + '/following/count');
  }

  getFollowersList(userId: string) {
    return this.http.get(this.apiUrl + '/users/' + userId + '/followers');
  }

  getFollowingsList(userId: string) {
    return this.http.get(this.apiUrl + '/users/' + userId + '/followings');
  }

  removeFollower(data: UserFollow) {
    return this.http.post(this.apiUrl + 'unfollow', data);
  }

  followUser(data:UserFollow) { 
    return this.http.post(this.apiUrl + 'follow', data);
  }
  

}
