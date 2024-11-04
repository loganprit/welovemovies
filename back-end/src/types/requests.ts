/**
 * Type for request body data containing review information
 */
interface ReviewData {
  content: string;
  score: number;
  critic_id?: number;
  movie_id?: number;
}

/**
 * Request body structure for review operations
 */
interface ReviewRequestBody {
  data: ReviewData;
}

/**
 * Route parameters for review-specific endpoints
 */
interface ReviewParams {
  readonly reviewId: string;
}

/**
 * Route parameters for theater-specific endpoints
 */
interface TheaterParams {
  readonly theaterId: string;
}

/**
 * Route parameters for movie-specific endpoints
 */
interface MovieParams {
  readonly movieId: string;
}

export type {
  ReviewData,
  ReviewRequestBody,
  ReviewParams,
  TheaterParams,
  MovieParams
};
