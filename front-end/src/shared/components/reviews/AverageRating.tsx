import React from "react";
import { Review } from "../../../types/api-types";
import { useTheme } from "../../theme/ThemeContext";

/**
 * Calculates the average rating from an array of reviews
 * @param reviews - Array of Review objects
 * @returns The average score with one decimal place or "N/A" if no reviews
 */
function averageReviewRating(reviews: Review[] = [], optimisticReviewId?: number, optimisticScore?: number): number | "N/A" {
  if (reviews.length === 0) {
    return "N/A";
  }

  const total = reviews.reduce((sum, review) => {
    const scoreToUse = review.review_id === optimisticReviewId ? optimisticScore : review.score;
    const validScore = Math.min(Math.max(scoreToUse ?? review.score, 1), 5);
    return sum + validScore;
  }, 0);

  return Number((total / reviews.length).toFixed(1));
}

interface AverageRatingProps {
  reviews: Review[];
  showCount?: boolean;
  optimisticReviewId?: number;
  optimisticScore?: number;
}

/**
 * Component that displays the average rating from a collection of reviews
 * @param props - Component props containing reviews array and display options
 * @returns JSX element displaying average rating
 */
const AverageRating: React.FC<AverageRatingProps> = ({ 
  reviews = [], 
  showCount = false,
  optimisticReviewId,
  optimisticScore 
}) => {
  const rating = averageReviewRating(reviews, optimisticReviewId, optimisticScore);
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <span className={`font-medium ${
        theme === "dark" ? "text-gray-200" : "text-gray-900"
      }`}>
        Average Rating:
      </span>
      <span 
        data-testid="average-rating"
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          rating === "N/A" 
            ? theme === "dark"
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-100 text-gray-600"
            : theme === "dark"
              ? "bg-primary-900/20 text-primary-300"
              : "bg-primary-100 text-primary-800"
        }`}
      >
        {rating}
      </span>
      {showCount && (
        <span className={theme === "dark" ? "text-sm text-gray-400" : "text-sm text-gray-500"}>
          ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};

export default AverageRating;
