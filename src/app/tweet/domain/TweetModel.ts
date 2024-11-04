export interface Tweet {
  _id: string;
  content: string;
  author: Author;
  likes: string[]; 
  retweets: string[];
  media: Media[];
  createdAt: string;
  __v: number;
}

export interface Author {
  _id: string;
  username: string;
  avatarURL: string;
  userId: string;
}

export interface Media {
  type: string; // Puede ser "image", "video", etc.
  url: string;
  _id: string;
}

export interface MediaItem {
  type: string;
  url: string;
}

export interface TweetDTO {
  content: string;
  author: string; // El ID del usuario que crea el tweet
  media: MediaItem[];
}