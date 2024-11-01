import React from "react";
import { Review } from "../types/api-types";

/**
 * Calculates the average rating from an array of reviews
 * @param reviews - Array of Review objects
 * @returns The rounded average score or "N/A" if no reviews
 */
function averageReviewRating(reviews: Review[] = []): number | "N/A" {
  if (reviews.length === 0) {
    return "N/A";
  }

  const total = reviews.reduce((sum, review) => {
    // Ensure score is within valid range (1-5)
    const validScore = Math.min(Math.max(review.score, 1), 5);
    return sum + validScore;
  }, 0);

  return Math.round(total / reviews.length);
}

interface AverageRatingProps {
  reviews: Review[];
}

/**
 * Component that displays the average rating from a collection of reviews
 * @param props - Component props containing reviews array
 * @returns JSX element displaying average rating
 */
const AverageRating: React.FC<AverageRatingProps> = ({ reviews = [] }) => {
  return (
    <p className="average-rating">
      <strong>Average Review Rating:</strong>{" "}
      <span data-testid="average-rating">{averageReviewRating(reviews)}</span>
    </p>
  );
};

export default AverageRating;
