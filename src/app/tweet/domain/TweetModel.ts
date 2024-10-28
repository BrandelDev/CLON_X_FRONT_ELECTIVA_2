export interface Tweet {
    content: string;              
    author: string;               
    media?: MediaItem[];        
  }
  
  export interface MediaItem {
    type: 'image' | 'video' | 'gif';  
    url: string;                      
  }
  