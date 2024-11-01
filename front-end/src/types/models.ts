import { Review, Theater } from "./api-types";

// Import and use the same interfaces from back-end for consistency
export interface ApiResponse<T> {
    data: T;
    error?: string;
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
    reviews?: Review[];
    theaters?: Theater[];
}