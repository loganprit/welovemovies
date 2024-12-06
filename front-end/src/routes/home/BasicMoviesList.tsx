import React from "react";
import { useTheme } from "../../shared/theme/ThemeContext";
import MovieCard from "../../shared/components/MovieCard";
import MovieCardSkeleton from "../../shared/components/MovieCard/Skeleton";
import ErrorAlert from "../../shared/ErrorAlert";
import { useMovieData } from "../../hooks/useMovieData";

const MoviesList: React.FC = () => {
  const { theme } = useTheme();
  const { movies, isLoading, error } = useMovieData();

  return (
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className={`font-poppins-heading text-4xl mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Now Showing
          </h2>
          <hr className={theme === "dark" ? "border-gray-700" : "border-gray-200"} />
        </div>
        
        <ErrorAlert error={error} />
        
        <section className="flex flex-wrap -mx-4">
          {isLoading ? (
            Array.from({ length: 16 }).map((_, index) => (
              <MovieCardSkeleton key={index} variant="grid" />
            ))
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.movie_id}
                movie={movie}
                variant="grid"
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default MoviesList;
