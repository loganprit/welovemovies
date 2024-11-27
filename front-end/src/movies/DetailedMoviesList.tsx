import React, { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import DetailedMovieSkeleton from "../shared/components/DetailedMovieCard/Skeleton";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";
import { Movie } from "../types/models";
import { ApiError } from "../types/api-types";
import { useTheme } from "../context/ThemeContext";

/**
 * Component that displays a list of detailed movies
 * @returns JSX element displaying the list of detailed movies
 */
const DetailedMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovies = async (): Promise<void> => {
      try {
        setError(null);
        setIsLoading(true);
        const movieData = await listMovies(abortController.signal);
        if (!abortController.signal.aborted) {
          setMovies(movieData);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          const apiError = err as ApiError;
          setError({
            name: "FetchError",
            message: apiError.message || "Failed to load movies",
            status: apiError.status
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();
    return () => abortController.abort();
  }, []);

  return (
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <ErrorAlert error={error} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className={`font-poppins-heading text-4xl mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            All Movies
          </h2>
          <hr className={theme === "dark" ? "border-gray-700" : "border-gray-200"} />
        </div>
        <section className={`divide-y ${
          theme === "dark" ? "divide-gray-700" : "divide-gray-200"
        }`}>
          {isLoading ? (
            // Show 4 skeleton loaders while loading
            Array.from({ length: 4 }).map((_, index) => (
              <DetailedMovieSkeleton key={index} />
            ))
          ) : (
            movies.map((movie) => (
              <MovieDetails key={movie.movie_id} movie={movie} variant="list" />
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default DetailedMoviesList;
