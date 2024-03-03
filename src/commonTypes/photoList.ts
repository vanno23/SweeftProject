export interface Photo {
  id: string;
  urls: {
    small: string;
  };
  user: {
    total_collections: number;
    total_promoted_photos: number;
    total_likes: number;
  };
  alt_description: string;
}
