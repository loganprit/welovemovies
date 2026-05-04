export interface ApiError extends Error {
  status?: number;
  name: string;
  message: string;
}

export interface Critic {
  critic_id: number;
  preferred_name: string;
  surname: string;
  organization_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  review_id: number;
  content: string;
  score: number;
  critic_id: number;
  movie_id: number;
  created_at: string;
  updated_at: string;
  critic?: Critic | null;
}

export interface Theater {
  theater_id: number;
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
  created_at: string;
  updated_at: string;
  movies?: (Movie & { is_showing?: boolean; theater_id?: number })[];
}

export interface Movie {
  movie_id: number;
  title: string;
  runtime_in_minutes: number;
  rating: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  is_showing?: boolean;
  reviews?: Review[];
  theaters?: (Theater & { is_showing?: boolean; movie_id?: number })[];
}
