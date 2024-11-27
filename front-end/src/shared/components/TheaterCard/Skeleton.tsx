import React from "react";
import { useTheme } from "../../../context/ThemeContext";

/**
 * TheaterCardSkeleton Component
 * Displays a loading placeholder for Theater components
 * 
 * @returns JSX element displaying loading skeleton
 */
const TheaterCardSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <article className={`rounded-lg shadow-sm border p-6 ${
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3">
          {/* Theater name placeholder */}
          <div className={`h-8 w-3/4 rounded animate-pulse mb-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`} />
          
          {/* Address placeholders */}
          <div className="space-y-2">
            <div className={`h-4 w-full rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`} />
            <div className={`h-4 w-2/3 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`} />
            <div className={`h-4 w-1/2 rounded animate-pulse ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`} />
          </div>
        </aside>
        
        <section className="lg:w-2/3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Movie poster placeholders */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index}
                className="aspect-[2/3] relative"
              >
                <div className={`w-full h-full rounded-lg animate-pulse ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export default TheaterCardSkeleton;
