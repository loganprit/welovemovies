import React from "react";
import { useTheme } from "../../theme/ThemeContext";

/**
 * ReviewListSkeleton Component
 * Displays a loading placeholder for ReviewList component
 * 
 * @returns JSX element displaying loading skeleton
 */
const ReviewListSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="mt-8">
      {/* Reviews header with average rating */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className={`h-8 w-32 rounded animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
        <div className="flex items-center gap-2">
          <div className={`h-8 w-36 rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-8 w-24 rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"
          }`} />
        </div>
      </div>

      {/* Score distribution skeleton */}
      <div className="mb-8">
        <h4 className={`h-6 w-40 mb-4 rounded animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`h-6 w-16 rounded animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`} />
              <div className={`flex-1 h-6 rounded animate-pulse ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/70"
              }`} />
              <div className={`h-6 w-8 rounded animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Review items skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div 
            key={index}
            className={`p-6 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="space-y-4">
              <div className={`h-6 w-48 rounded animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`} />
              <div className={`h-4 w-32 rounded animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`} />
              <div className="space-y-2">
                <div className={`h-4 w-full rounded animate-pulse ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`} />
                <div className={`h-4 w-5/6 rounded animate-pulse ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`} />
              </div>
              {/* Rating counter and delete button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-6 w-16 rounded animate-pulse ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`} />
                  <div className={`h-8 w-24 rounded animate-pulse ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`} />
                </div>
                <div className={`h-10 w-32 rounded animate-pulse ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewListSkeleton;