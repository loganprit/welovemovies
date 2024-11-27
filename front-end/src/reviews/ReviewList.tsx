import React from "react";
import { Review as ReviewType } from "../types/api-types";
import Review from "./Review";
import ReviewDistribution from "./ReviewDistribution";
import AverageRating from "./AverageRating";
import { useTheme } from "../context/ThemeContext";

interface ReviewListProps {
  reviews?: ReviewType[];
  deleteReview: (review: ReviewType) => Promise<void>;
  setReviewScore: (review: ReviewType, score: number) => Promise<void>;
}

/**
 * Component that displays a list of reviews sorted by critic name
 * @param props - Component props containing reviews array and handlers
 * @returns JSX element displaying the sorted list of reviews
 */
const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews = [], 
  deleteReview, 
  setReviewScore 
}) => {
  const { theme } = useTheme();

  if (!reviews.length) {
    return (
      <div className={`text-center py-8 ${
        theme === "dark" ? "text-gray-400" : "text-gray-500"
      }`}>
        No reviews yet
      </div>
    );
  }

  const sortedReviews = reviews
    .sort((leftReview, rightReview) => {
      if (!leftReview.critic || !rightReview.critic) return 0;
      return leftReview.critic.preferred_name.localeCompare(
        rightReview.critic.preferred_name
      );
    });

  return (
    <section className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className={`font-poppins-heading text-2xl ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          Reviews
        </h3>
        <AverageRating reviews={reviews} showCount={true} />
      </div>
      <div className="mb-8">
        <ReviewDistribution reviews={reviews} />
      </div>
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Review
            key={review.review_id}
            review={review}
            deleteReview={deleteReview}
            setReviewScore={setReviewScore}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewList;
