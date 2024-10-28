import { Component } from '@angular/core';
import { TweetService } from '../../tweet/infrastructure/tweet.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

  constructor(private TweetService: TweetService) { 
    this.getTweets();

  }

  

  getTweets() {
    console.log('Holaaaaaaaaa')
    this.TweetService.getTweets().subscribe({
      next: response => {
        console.log(response);
      },
      error: response => { }
    })


  }

}
