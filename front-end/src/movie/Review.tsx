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

const scoreButtonStyle: React.CSSProperties = {
  padding: "0 0px 5px 5px",
};

/**
 * Component that displays a single review with rating controls
 * @param props - Component props containing review data and handlers
 * @returns JSX element displaying the review
 */
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
    return <div>Review information unavailable</div>;
  }

  return (
    <section className="border p-4 mb-4">
      <h4>
        {critic.preferred_name} {critic.surname}
        <small> of {critic.organization_name}</small>
      </h4>
      <p
        dangerouslySetInnerHTML={{ __html: parser(review.content) as string }}
      />
      <p>
        <strong>Rating:</strong> {review.score}
        <button
          className="btn btn-link"
          style={scoreButtonStyle}
          onClick={handleIncreaseClick}
          aria-label="Increase rating"
        >
          ↑
        </button>
        <button
          className="btn btn-link"
          style={scoreButtonStyle}
          onClick={handleDecreaseClick}
          aria-label="Decrease rating"
        >
          ↓
        </button>
      </p>

      <button 
        className="btn btn-danger" 
        onClick={() => deleteReview(review)}
        aria-label="Delete review"
      >
        Destroy Review
      </button>
    </section>
  );
};

export default Review;
