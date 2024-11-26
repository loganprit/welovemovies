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
  const rating = averageReviewRating(reviews);
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-gray-900">Average Rating:</span>
      <span 
        data-testid="average-rating"
        className={`px-3 py-1 rounded-full text-sm font-medium
          ${rating === "N/A" 
            ? "bg-gray-100 text-gray-600" 
            : "bg-primary-100 text-primary-800"}`}
      >
        {rating}
      </span>
      <span className="text-sm text-gray-500">
        ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
};

export default AverageRating;
