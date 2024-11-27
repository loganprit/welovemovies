import React from "react";
import { useTheme } from "../../theme/ThemeContext";

/**
 * MoviePosterSkeleton Component
 * Displays a loading placeholder for movie poster
 * 
 * @returns JSX element displaying loading skeleton
 */
const MoviePosterSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full aspect-[2/3] rounded-lg animate-pulse ${
      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
    }`} />
  );
};

export default MoviePosterSkeleton; 