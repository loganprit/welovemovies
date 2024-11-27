import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "../../shared/components/reviews/ReviewList";
import ReviewListSkeleton from "../../shared/components/ReviewList/Skeleton";
import TheaterList from "../theaters/TheaterList";
import { deleteReview, readMovie, updateReview } from "../../utils/api";
import ErrorAlert from "../../shared/ErrorAlert";
import { Movie } from "../../types/models";
import { Review, ApiError } from "../../types/api-types";
import { useTheme } from "../../shared/theme/ThemeContext";
import MovieDetails from "./MovieDetails";
import DetailedMovieSkeleton from "../../shared/components/MovieCard/Skeleton";
import MoviePosterSkeleton from "../../shared/components/MoviePoster/Skeleton";

interface RouteParams extends Record<string, string | undefined> {
  movieId: string;
}

/**
 * Component that displays detailed information about a specific movie
 * Including its reviews and theaters where it's showing
 */
const FullMovie: React.FC = () => {
  const { movieId } = useParams<RouteParams>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadMovie = async (id: string): Promise<void> => {
      try {
        setError(null);
        setIsLoading(true);
        const movieData = await readMovie(Number(id), abortController.signal);
        if (!abortController.signal.aborted) {
          setMovie(movieData);
        }
      } catch (err) {
        if (!abortController.signal.aborted && (err as Error).name !== "AbortError") {
          const apiError = err as ApiError;
          setError({
            name: "FetchError",
            message: apiError.message || "Failed to load movie",
            status: apiError.status
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (movieId) {
      loadMovie(movieId);
    }

    return () => abortController.abort();
  }, [movieId]);

  const handleDeleteReview = async (review: Review): Promise<void> => {
    try {
      await deleteReview(review.review_id);
      if (movieId) {
        const updatedMovie = await readMovie(Number(movieId));
        setMovie(updatedMovie);
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError({
        name: "DeleteError",
        message: apiError.message || "Failed to delete review",
        status: apiError.status
      });
    }
  };

  const handleUpdateScore = async (review: Review, score: number): Promise<void> => {
    try {
      await updateReview(review.review_id, { score });
      if (movieId) {
        const updatedMovie = await readMovie(Number(movieId));
        setMovie(updatedMovie);
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError({
        name: "UpdateError",
        message: apiError.message || "Failed to update score",
        status: apiError.status
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <section className="flex flex-col lg:flex-row gap-8">
          <article className="w-full lg:w-1/4">
            <MoviePosterSkeleton />
          </article>
          <aside className="flex-1 space-y-8">
            <section className="space-y-6">
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

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`h-6 w-24 rounded animate-pulse ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`} />
                  <div className={`h-6 w-32 rounded animate-pulse ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"
                  }`} />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-6 w-20 rounded animate-pulse ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`} />
                  <div className={`h-6 w-24 rounded animate-pulse ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"
                  }`} />
                </div>
              </div>
            </section>

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
                    <div className={`h-6 w-3/4 mb-4 rounded animate-pulse ${
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
                ))}
              </div>
            </section>

            <ReviewListSkeleton />
          </aside>
        </section>
      );
    }

    if (!movie) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
            Loading...
          </div>
        </div>
      );
    }

    return (
      <section className="flex flex-col lg:flex-row gap-8">
        <article className="w-full lg:w-1/4">
          <img
            alt={`${movie.title} Poster`}
            className="w-full rounded-lg shadow-lg object-cover"
            src={movie.image_url}
          />
        </article>
        <aside className="flex-1 space-y-8">
          <MovieDetails movie={movie} variant="full" />
          <TheaterList theaters={movie.theaters} variant="simple" />
          <ReviewList
            reviews={movie.reviews}
            deleteReview={handleDeleteReview}
            setReviewScore={handleUpdateScore}
          />
        </aside>
      </section>
    );
  };

  return (
    <div className={`min-h-screen ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="container mx-auto px-4 py-8">
        <ErrorAlert error={error} />
        {renderContent()}
      </div>
    </div>
  );
};

export default FullMovie;
