import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet, TweetDTO } from '../domain/TweetModel';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private apiUrl = enviroment.XBackEnd;

  constructor(private http: HttpClient) { }



  public getTweets(): Observable<Tweet[]> {
    return this.http.get<any>(`${this.apiUrl}tweet/get`);
  }

  public createTweet(tweet: TweetDTO): Observable<Tweet> {
    return this.http.post<any>(`${this.apiUrl}tweet/create`, tweet);
  }

  public updateTweet(tweet: Tweet, tweetId: string): Observable<Tweet> {
    return this.http.put<Tweet>(`${this.apiUrl}tweet/update/${tweetId}`, tweet);
  }
  public deleteTweet(tweetId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}tweet/delete/${tweetId}`);
  }

  public likeTweet(userId: string): Observable<Tweet> {
    return this.http.post<Tweet>(`${this.apiUrl}tweet/like/${userId}`, userId);
   }

   getTweetsByUser(userId?: string): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${this.apiUrl}/tweet/tweetsByUser/${userId}`);
  }

    


    }



