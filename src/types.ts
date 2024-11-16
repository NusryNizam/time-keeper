export interface UnsplashResponse {
  total: number; // Total number of results
  total_pages: number; // Total number of pages
  results: Photo[]; // Array of photo objects
}

export interface Photo {
  id: string; // Unique ID of the photo
  alt_description: string | null; // Alternative description of the image
  urls: {
    thumb: string; // URL for the thumbnail image
    small: string; // URL for a small-sized image
    regular: string; // URL for a regular-sized image
  };
  user: {
    name: string;
    first_name: string;
    last_name: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
    download_location: string;
  };
}
