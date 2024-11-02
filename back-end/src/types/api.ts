// Base response interface that all responses will extend
interface ApiResponse<T> {
    data: T;
    error?: string;
}

// Movie interface based on the database schema and API responses
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

// Theater interface based on the database schema
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

// Review interface based on the database schema
interface Review {
    review_id: number;
    content: string;
    score: number;
    critic_id: number;
    movie_id: number;
    created_at: string;
    updated_at: string;
}

// Critic interface based on the database schema
interface Critic {
    critic_id: number;
    preferred_name: string;
    surname: string;
    organization_name: string;
    created_at: string;
    updated_at: string;
}

// Extended Review interface that includes critic information
interface ReviewWithCritic extends Review {
    critic: Critic;
}

// Theater with movies interface for the /theaters endpoint
interface TheaterWithMovies extends Theater {
    movies: (Movie & {
        is_showing: boolean;
        theater_id: number;
    })[];
}

// Export all interfaces
export type {
    ApiResponse,
    Movie,
    Theater,
    Review,
    Critic,
    ReviewWithCritic,
    TheaterWithMovies
};