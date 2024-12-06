import React from "react";
import { useTheme } from "../../theme/ThemeContext";
import ReviewListSkeleton from "../ReviewList/Skeleton";

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

  if (variant === "full") {
    return (
      <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
        <div className="container mx-auto px-4 py-8">
          <section className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <article className="w-full lg:w-1/4">
              <div className={`w-full aspect-[2/3] rounded-lg shadow-lg animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`} />
            </article>

            {/* Content Side */}
            <aside className="flex-1 space-y-8">
              {/* Movie Details */}
              <div className="space-y-6">
                <div className={`h-10 w-2/3 rounded animate-pulse ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`} />
                
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
              </div>

              {/* Theaters Section */}
              <section className="mt-8">
                <div className={`h-8 w-48 mb-6 rounded animate-pulse ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div 
                      key={index}
                      className={`p-6 rounded-lg border ${
                        theme === "dark" 
                          ? "bg-gray-800 border-gray-700" 
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className={`h-6 w-3/4 rounded animate-pulse ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        }`} />
                        <div className="space-y-2">
                          <div className={`h-4 w-full rounded animate-pulse ${
                            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                          }`} />
                          <div className={`h-4 w-2/3 rounded animate-pulse ${
                            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                          }`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews Section */}
              <ReviewListSkeleton />
            </aside>
          </section>
        </div>
      </main>
    );
  }

  // Original list variant layout
  return (
    <div className={`flex flex-col md:flex-row gap-8 py-8 border-b ${
      theme === "dark" ? "border-gray-700" : "border-gray-200"
    }`}>
    </div>
  );
};

export default DetailedMovieSkeleton;