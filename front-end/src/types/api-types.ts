/**
 * Interface for API request options
 */
export interface ApiRequestOptions extends RequestInit {
    headers: Headers;
    signal?: AbortSignal;
}

/**
 * Interface for API response
 */
export interface ApiResponse<T> {
    data: T;
    error?: string;
}

/**
 * Interface for Review
 */
export interface Review {
    review_id: number;
    content: string;
    score: number;
    critic_id: number;
    movie_id: number;
    created_at: string;
    updated_at: string;
    critic?: Critic;
}

/**
 * Interface for Critic
 */
export interface Critic {
    critic_id: number;
    preferred_name: string;
    surname: string;
    organization_name: string;
    created_at: string;
    updated_at: string;
}

/**
 * Interface for Theater
 */
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
}

/**
 * Custom error type for API errors that includes status and name
 */
export interface ApiError extends Error {
    status?: number;
    name: string;
    message: string;
} 