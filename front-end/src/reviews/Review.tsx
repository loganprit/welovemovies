import React from "react";
import { marked } from "marked";
import { Review as ReviewType } from "../types/api-types";

// Create a synchronous marked parser
const parser = marked.parseInline;

interface ReviewProps {
  review: ReviewType;
  deleteReview: (review: ReviewType) => Promise<void>;
  setReviewScore: (review: ReviewType, score: number) => Promise<void>;
}

const Review: React.FC<ReviewProps> = ({ review, deleteReview, setReviewScore }) => {
  const handleIncreaseClick = async (): Promise<void> => {
    const score = review.score + 1;
    if (score > 5) return;
    await setReviewScore(review, score);
  };

  const handleDecreaseClick = async (): Promise<void> => {
    const score = review.score - 1;
    if (score < 1) return;
    await setReviewScore(review, score);
  };

  const { critic } = review;

  if (!critic) {
    return (
      <div className="p-4 text-gray-600 bg-gray-50 rounded-lg">
        Review information unavailable
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 transition-shadow hover:shadow-md">
      <header className="mb-4">
        <h4 className="text-lg font-poppins-heading text-gray-900">
          {critic.preferred_name} {critic.surname}
          <span className="text-sm text-gray-600 ml-2">
            of {critic.organization_name}
          </span>
        </h4>
      </header>
      
      <div 
        className="prose prose-sm max-w-none mb-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: parser(review.content) as string }}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Rating:</span>
          <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
            <button
              className="text-primary-600 hover:text-primary-800 px-2 py-1 transition-colors"
              onClick={handleDecreaseClick}
              aria-label="Decrease rating"
            >
              −
            </button>
            <span className="mx-2 font-medium">{review.score}</span>
            <button
              className="text-primary-600 hover:text-primary-800 px-2 py-1 transition-colors"
              onClick={handleIncreaseClick}
              aria-label="Increase rating"
            >
              +
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => deleteReview(review)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                     transition-colors duration-200 focus:ring-2 focus:ring-offset-2 
                     focus:ring-red-500"
          aria-label="Delete review"
        >
          Delete Review
        </button>
      </div>
    </article>
  );
};

export default Review;
