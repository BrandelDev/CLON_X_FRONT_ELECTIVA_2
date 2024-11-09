import { Component, inject } from '@angular/core';
import { UserService } from '../../../user/infrastructure/user.service'; // Ensure the correct path to UserService
import { TweetService } from '../../../tweet/infrastructure/tweet.service';
import { ActivatedRoute } from '@angular/router';
import { Tweet } from '../../../tweet/domain/TweetModel';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [DatePipe, MatIconModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent {
  tweetService = inject(TweetService);
  route = inject(ActivatedRoute);
  userId: string | null;
  tweets!: Tweet[]

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getTweetsByUser()
    }
  }

  

getTweetsByUser(){ 

  this.tweetService.getTweetsByUser(this.userId!).subscribe({
    next: (tweets) => {
      this.tweets = tweets;
      console.log(this.tweets);
    },
    error: (err) => {
      console.error('Error al obtener los tweets:', err);
    }
  });
}

likeTweet(tweetId: string) {

  this.tweetService.likeTweet(tweetId).subscribe({
    next: () => {
      this.getTweetsByUser();
    },
    error: response => {
      alert('Error al dar like, coño');
    }
  })
}

}

