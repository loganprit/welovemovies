import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ReviewList from "../reviews/ReviewList";
import TheaterList from "../theaters/TheaterList";
import { deleteReview, readMovie, updateReview } from "../utils/api";
import ErrorAlert from "../shared/ErrorAlert";
import { Movie } from "../types/models";
import { Review } from "../types/api-types";
import { ApiError } from "../types/api-types";

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

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadMovie = async (id: string): Promise<void> => {
      try {
        setError(null);
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

  const handleUpdateScore = async (
    review: Review,
    score: number
  ): Promise<void> => {
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

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorAlert error={error} />
      <section className="flex flex-col lg:flex-row gap-8">
        <article className="w-full lg:w-1/4">
          <img
            alt={`${movie.title} Poster`}
            className="w-full rounded-lg shadow-lg object-cover"
            src={movie.image_url}
          />
        </article>
        <aside className="flex-1 space-y-8">
          <Details movie={movie} />
          <TheaterList theaters={movie.theaters} />
          <ReviewList
            reviews={movie.reviews}
            deleteReview={handleDeleteReview}
            setReviewScore={handleUpdateScore}
          />
        </aside>
      </section>
    </div>
  );
};

export default FullMovie;
