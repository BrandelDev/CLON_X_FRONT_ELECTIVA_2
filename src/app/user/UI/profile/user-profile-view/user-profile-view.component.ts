import { Component, inject } from '@angular/core';
import { UserService } from '../../../infrastructure/user.service';
import { AuthService } from '../../../../auth/infrastructure/auth.service';
import { User } from '../../../../auth/domain/Auth';
import { FollowersFollowingsComponent } from "../../followers-followings/followers-followings.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile-view',
  standalone: true,
  imports: [FollowersFollowingsComponent],
  templateUrl: './user-profile-view.component.html',
  styleUrl: './user-profile-view.component.css'
})
export class UserProfileViewComponent {
  userService = inject(UserService)
  auth = inject(AuthService)
  userData: User | undefined;
  followersCount: number = 0;
  followingsCount: number = 0;
  constructor() {
    this.userData = this.auth.getUser();
    console.log(this.userData);
    this.getFollowers();
    this.getFollowings();
  }

  getFollowers() {
    this.userService.getCountFollowers(this.userData?.id).subscribe({
      next: (response: any) => {
        this.followersCount = response.followerCount;
        console.log(response);
      },
      error: response => {
        console.error(response);
      }
    })
  }

  getFollowings() {
    this.userService.getCountFollowing(this.userData?.id).subscribe({
      next: (response: any) => {
        this.followingsCount = response.followingCount;
        console.log(response);
      },
      error: response => {
        console.error(response);
      }

    })
  }

  getFollowingsList() {
    this.userService.getFollowingsList(this.userData?.id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: response => {
        console.error(response);
      }
    })
  }

  getFollowersList() {
    this.userService.getFollowersList(this.userData?.id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: response => {
        console.error(response);
      }
    })
   }


}
