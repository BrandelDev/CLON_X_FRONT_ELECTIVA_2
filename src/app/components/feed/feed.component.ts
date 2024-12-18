import { Component, inject } from '@angular/core';
import { TweetService } from '../../tweet/infrastructure/tweet.service';
import { Tweet, TweetDTO } from '../../tweet/domain/TweetModel';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../auth/infrastructure/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../auth/domain/Auth';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../user/infrastructure/user.service';
import { UserFollow } from '../../user/domain/UserFollow';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [DatePipe, MatIconModule, ReactiveFormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {


  userService = inject(UserService);

  user!: User | undefined;
  allTweets: Tweet[] = []
  tweetForm: FormGroup;


  constructor(private TweetService: TweetService, private authService: AuthService, private fb: FormBuilder) {

    this.tweetForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(280)]], // Longitud máxima para el tweet
      author: ['', Validators.required],
      media: this.fb.array([
        this.fb.group({
          type: ['image', Validators.required], // Puede cambiar según el tipo de medio
          url: ['', Validators.required]
        })
      ])
    });
    this.user = this.authService.getUser();
    this.user?.id
    console.log(this.user);

    this.getTweets();
  }

  getTweets() {
    this.TweetService.getTweets().subscribe({
      next: response => {
        this.allTweets = response
        console.log(response);
      },
      error: response => {
        alert('Error al obtener tweets, coño');
      }
    })
  }

  likeTweet(tweetId: string) {

    this.TweetService.likeTweet(tweetId).subscribe({
      next: () => {
        this.getTweets();
      },
      error: response => {
        alert('Error al dar like, coño');
      }
    })
  }

  createTweet() {
    if (this.user) {
      const dataData: TweetDTO = {
        content: this.tweetForm.get('content')?.value,
        author: this.user.id,
        media: this.tweetForm.get('media')?.value.map((media: { type: any; url: any; }) => ({ type: media.type, url: media.url }))
      }
      this.TweetService.createTweet(dataData).subscribe({
        next: () => {
          this.getTweets();
          this.tweetForm.reset();
        },
        error: response => {
          alert('Error al crear tweet, coño');
        }
      });
    }
  }

  followUser(Tweet: Tweet) {
    const followData:UserFollow = {
      userId:Tweet.author.userId,
      followerId: this.authService.getUser()?.id,
    }
    
    this.userService.followUser(followData).subscribe({
      next: () => {
        alert('Se siguió al usuario');
      },
      error: response => {
        alert('Error al seguir al usuario, coño');
      }
    })

  }
}
