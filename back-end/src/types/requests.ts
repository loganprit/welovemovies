/**
 * Interface defining the request body structure for creating/updating a review
 * Contains the review data including content, score and optional IDs
 */
interface ReviewRequestBody {
  data: {
    content: string;
    score: number;
    critic_id?: number;
    movie_id?: number;
  };
}

/**
 * Interface defining URL parameters for review-specific routes
 * Contains the review ID parameter
 */
interface ReviewParams {
  reviewId: string;
}

/**
 * Interface defining URL parameters for theater-specific routes
 * Contains the theater ID parameter
 */
interface TheaterParams {
  theaterId: string;
}

export type {
  ReviewRequestBody,
  ReviewParams,
  TheaterParams
};
