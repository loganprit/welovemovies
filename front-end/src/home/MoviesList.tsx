import React, { useEffect, useState } from "react";
import { Movie } from "../types/models";
import { ApiError } from "../types/api-types";
import { listMovies } from "../utils/api";
import { useTheme } from "../context/ThemeContext";
import MovieCard from "../shared/components/MovieCard";
import MovieCardSkeleton from "../shared/components/MovieCard/Skeleton";
import ErrorAlert from "../shared/ErrorAlert";

/**
 * MoviesList Component
 * Displays a grid of movie posters with titles that link to individual movie pages
 * Fetches movie data on mount and handles loading/error states
 */
const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadMovies = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const fetchedMovies = await listMovies(abortController.signal);
        if (!abortController.signal.aborted) {
          setMovies(fetchedMovies);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          const apiError = err as ApiError;
          setError(apiError);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadMovies();
    return () => abortController.abort();
  }, []);

  return (
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <div className="container mx-auto px-6 py-8">
        <div className="mt-8">
          <h2 className={`font-poppins-heading text-4xl mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Now Showing
          </h2>
          <hr className={`mb-8 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`} />
        </div>
        
        <ErrorAlert error={error} />
        
        <section className="flex flex-wrap -mx-4">
          {isLoading ? (
            // Show 8 skeleton loaders while loading
            Array.from({ length: 8 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.movie_id}
                movie={movie}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default MoviesList;
