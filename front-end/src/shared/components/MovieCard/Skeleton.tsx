import React from "react";
import { useTheme } from "../../theme/ThemeContext";

interface MovieCardSkeletonProps {
  variant?: "grid" | "list";
}

/**
 * MovieCardSkeleton Component
 * Displays a loading placeholder for MovieCard components
 *
 * @param props - Component props containing display variant
 * @returns JSX element displaying loading skeleton
 */
const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({ 
  variant = "grid" 
}) => {
  const { theme } = useTheme();

  return (
    <div className={`relative ${
      variant === "grid" 
        ? "p-4 sm:w-1/2 md:w-1/3 lg:w-1/4" 
        : "w-full"
    }`}>
      {/* Movie Poster placeholder */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <div className={`w-full h-full animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
      </div>
      {/* Movie Title and Rating placeholders */}
      <div className="mt-4 space-y-2">
        <div className={`h-6 rounded animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
        <div className={`h-4 w-1/4 mx-auto rounded animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;