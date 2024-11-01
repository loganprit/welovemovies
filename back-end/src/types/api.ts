/**
 * Base response interface for all API responses
 * @template T The type of data contained in the response
 */
interface ApiResponse<T> {
    data: T;
    error?: string;
}

/**
 * Movie entity interface based on database schema
 */
interface Movie {
    movie_id: number;
    title: string;
    runtime_in_minutes: number;
    rating: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

/**
 * Theater entity interface based on database schema
 */
interface Theater {
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
 * Review entity interface based on database schema
 */
interface Review {
    review_id: number;
    content: string;
    score: number;
    critic_id: number;
    movie_id: number;
    created_at: string;
    updated_at: string;
}

/**
 * Critic entity interface based on database schema
 */
interface Critic {
    critic_id: number;
    preferred_name: string;
    surname: string;
    organization_name: string;
    created_at: string;
    updated_at: string;
}

/**
 * Extended Review interface that includes critic information
 */
interface ReviewWithCritic extends Review {
    critic: Critic;
}

/**
 * Extended Theater interface that includes movie information
 */
interface TheaterWithMovies extends Theater {
    movies: (Movie & {
        is_showing: boolean;
        theater_id: number;
    })[];
}

export type {
    ApiResponse,
    Movie,
    Theater,
    Review,
    Critic,
    ReviewWithCritic,
    TheaterWithMovies
};