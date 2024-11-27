import React from "react";
import { useTheme } from "../../theme/ThemeContext";

interface DetailedMovieSkeletonProps {
  variant?: "list" | "full";
}

/**
 * DetailedMovieSkeleton Component
 * Displays a loading placeholder that matches the detailed movie list layout
 * 
 * @param props - Component props containing display variant
 * @returns JSX element displaying loading skeleton
 */
const DetailedMovieSkeleton: React.FC<DetailedMovieSkeletonProps> = ({ 
  variant = "list" 
}) => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col md:flex-row gap-8 py-8 border-b ${
      theme === "dark" ? "border-gray-700" : "border-gray-200"
    }`}>
      {/* Poster placeholder */}
      <article className="w-full md:w-1/4 flex-shrink-0">
        <div className={`w-full h-[400px] rounded-lg shadow-lg animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
      </article>

      {/* Content placeholder */}
      <div className="flex-1 space-y-6">
        {/* Title placeholder */}
        <div className={`h-10 w-2/3 rounded animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />

        {/* Description placeholder - Multiple lines */}
        <div className="space-y-2">
          <div className={`h-4 w-full rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-4 w-11/12 rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-4 w-4/5 rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
        </div>

        {/* Runtime and Rating placeholders */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`h-6 w-20 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`} />
            <div className={`h-6 w-32 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"
            }`} />
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-6 w-16 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`} />
            <div className={`h-6 w-24 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"
            }`} />
          </div>
        </div>

        {/* See More button skeleton - Only show in list variant */}
        {variant === "list" && (
          <div className="mt-6">
            <div className={`h-10 w-32 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedMovieSkeleton; 