import React from "react";
import { useTheme } from "../../../context/ThemeContext";

/**
 * DetailedMovieSkeleton Component
 * Displays a loading placeholder for DetailedMovie components
 * 
 * @returns JSX element displaying loading skeleton
 */
const DetailedMovieSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className={`flex flex-col md:flex-row gap-8 py-8 border-b ${
      theme === "dark" 
        ? "border-gray-700" 
        : "border-gray-200"
    }`}>
      <article className="w-full md:w-1/4 flex-shrink-0">
        <div className={`w-full h-[400px] rounded-lg animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
      </article>
      <aside className="flex-1 space-y-6">
        <div className={`h-10 w-3/4 rounded animate-pulse ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`} />
        <div className="space-y-3">
          {/* Description placeholder */}
          <div className={`h-4 w-full rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-4 w-5/6 rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-4 w-4/6 rounded animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
        </div>
        <div className="space-y-3">
          {/* Runtime, Rating, and Average Rating placeholders */}
          <div className={`h-8 w-40 rounded-full animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-8 w-32 rounded-full animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          <div className={`h-8 w-56 rounded-full animate-pulse ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
        </div>
      </aside>
    </section>
  );
};

export default DetailedMovieSkeleton;