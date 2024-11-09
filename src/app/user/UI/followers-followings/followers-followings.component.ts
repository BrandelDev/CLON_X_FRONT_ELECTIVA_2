import { Component, inject } from '@angular/core';
import { UserService } from '../../infrastructure/user.service';
import { AuthService } from '../../../auth/infrastructure/auth.service';
import { User } from '../../../auth/domain/Auth';
import { Followers } from '../../domain/Followers';
import { Following, Followings } from '../../domain/Following';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-followers-followings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './followers-followings.component.html',
  styleUrl: './followers-followings.component.css'
})
export class FollowersFollowingsComponent {
  userService = inject(UserService)
  auth = inject(AuthService)
  userData: User | undefined;

  followersList!:Followers;
  followingList!:Followings;
  
  constructor(){
    this.userData = this.auth.getUser();
    this.getFollowersList()
    this.getFollowingList()
  }


  getFollowersList() {
    this.userService.getFollowersList(this.userData?.id).subscribe({
      next: (response: any) => {
        this.followersList = response;
        console.log(response);
      },
      error: response => {
        console.error(response);
      }
    })
   }
   getFollowingList() {
    this.userService.getFollowingsList(this.userData?.id).subscribe({
      next: (response: any) => {
        this.followingList = response
        console.log(response);
      },
      error: response => {
        console.error(response);
      }
    })
   }

}
