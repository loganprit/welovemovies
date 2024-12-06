import React, { useState, useCallback, useRef } from "react";
import { marked } from "marked";
import { Review as ReviewType } from "../../../types/api-types";
import { useTheme } from "../../theme/ThemeContext";

// Create a synchronous marked parser
const parser = marked.parseInline;

interface ReviewProps {
  review: ReviewType;
  deleteReview: (review: ReviewType) => Promise<void>;
  setReviewScore: (review: ReviewType, score: number) => Promise<void>;
}

const Review: React.FC<ReviewProps> = ({ review, deleteReview, setReviewScore }) => {
  const { theme } = useTheme();
  const [optimisticScore, setOptimisticScore] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updateScore = useCallback(async (newScore: number) => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Update UI immediately
    setOptimisticScore(newScore);
    
    // Set new timeout for API call
    timeoutRef.current = setTimeout(async () => {
      try {
        await setReviewScore(review, newScore);
      } catch (error) {
        setOptimisticScore(null);
        console.error("Failed to update score:", error);
      }
    }, 1000);
  }, [review, setReviewScore]);

  const handleIncreaseClick = async (): Promise<void> => {
    const currentScore = optimisticScore ?? review.score;
    const newScore = currentScore + 1;
    if (newScore > 5) return;
    updateScore(newScore);
  };

  const handleDecreaseClick = async (): Promise<void> => {
    const currentScore = optimisticScore ?? review.score;
    const newScore = currentScore - 1;
    if (newScore < 1) return;
    updateScore(newScore);
  };

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const { critic } = review;

  if (!critic) {
    return (
      <div className={`p-4 rounded-lg ${
        theme === "dark" 
          ? "bg-gray-800 text-gray-300" 
          : "bg-gray-50 text-gray-600"
      }`}>
        Review information unavailable
      </div>
    );
  }

  return (
    <article className={`rounded-lg shadow-sm p-6 mb-6 transition-all duration-200 
      border hover:shadow-md ${
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <header className="mb-4">
        <h4 className={`text-lg font-poppins-heading ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {critic.preferred_name} {critic.surname}
          <span className={`text-sm ml-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            of {critic.organization_name}
          </span>
        </h4>
      </header>
      
      <div 
        className={`prose prose-sm max-w-none mb-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
        dangerouslySetInnerHTML={{ __html: parser(review.content) as string }}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-900"
          }`}>
            Rating:
          </span>
          <div className={`flex items-center rounded-lg px-2 py-1 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}>
            <button
              className={`px-2 py-1 transition-colors ${
                theme === "dark"
                  ? "text-primary-400 hover:text-primary-300"
                  : "text-primary-600 hover:text-primary-800"
              }`}
              onClick={handleDecreaseClick}
              aria-label="Decrease rating"
            >
              −
            </button>
            <span className={`mx-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-900"
            }`}>
              {optimisticScore ?? review.score}
            </span>
            <button
              className={`px-2 py-1 transition-colors ${
                theme === "dark"
                  ? "text-primary-400 hover:text-primary-300"
                  : "text-primary-600 hover:text-primary-800"
              }`}
              onClick={handleIncreaseClick}
              aria-label="Increase rating"
            >
              +
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => deleteReview(review)}
          className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 
            focus:ring-2 focus:ring-offset-2 ${
            theme === "dark"
              ? "bg-red-700 hover:bg-red-600 focus:ring-red-600"
              : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
          }`}
          aria-label="Delete review"
        >
          Delete Review
        </button>
      </div>
    </article>
  );
};

export default Review;
