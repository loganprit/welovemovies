import React, { useMemo } from "react";
import { Review } from "../types/api-types";
import { useTheme } from "../context/ThemeContext";

interface ReviewDistributionProps {
  reviews: Review[];
}

/**
 * Component that displays a bar graph showing the distribution of review scores
 * @param props - Component props containing reviews array
 * @returns JSX element displaying the review score distribution
 */
const ReviewDistribution: React.FC<ReviewDistributionProps> = ({ reviews = [] }) => {
  const { theme } = useTheme();

  const distribution = useMemo(() => {
    const counts = new Array(5).fill(0);
    reviews.forEach((review) => {
      // Ensure score is within valid range (1-5)
      const validScore = Math.min(Math.max(review.score, 1), 5);
      counts[validScore - 1]++;
    });
    return counts;
  }, [reviews]);

  // Calculate total number of reviews for percentage calculation
  const totalReviews = reviews.length;

  return (
    <div className="space-y-2">
      <h4 className={`font-medium ${
        theme === "dark" ? "text-gray-200" : "text-gray-900"
      }`}>
        Score Distribution
      </h4>
      <div className="space-y-2">
        {distribution.slice().reverse().map((count, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-8 text-right text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              {5 - index} ★
            </span>
            <div className={`flex-1 h-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            } rounded-full overflow-hidden`}>
              <div
                className={`h-full transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gray-600"
                    : "bg-gray-300"
                } rounded-full`}
                style={{
                  width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%`,
                }}
              />
            </div>
            <span className={`w-8 text-sm text-right ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDistribution; 