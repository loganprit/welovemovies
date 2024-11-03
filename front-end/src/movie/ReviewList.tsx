import React from "react";
import { Review as ReviewType } from "../types/api-types";
import Review from "./Review";

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
  if (!reviews.length) {
    return null;
  }

  const list = reviews
    .sort((leftReview, rightReview) => {
      if (!leftReview.critic || !rightReview.critic) {
        return 0;
      }
      return leftReview.critic.preferred_name.localeCompare(
        rightReview.critic.preferred_name
      );
    })
    .map((review) => (
      <Review
        key={review.review_id}
        review={review}
        deleteReview={deleteReview}
        setReviewScore={setReviewScore}
      />
    ));

  return (
    <section className="mt-4">
      <h3>Reviews</h3>
      {list}
    </section>
  );
};

export default ReviewList;
