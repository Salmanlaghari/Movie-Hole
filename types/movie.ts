export interface Movie {
  id: number;
  title?: string;
  name?: string; // For TV shows
  original_title?: string;
  original_name?: string; // For TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string; // For TV shows
  media_type?: "movie" | "tv" | "person"; // From multi-search
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number | null;
  tagline?: string | null;
  status?: string;
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Cast[];
  };
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
