import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ReviewList from "./ReviewList";
import TheaterList from "./TheaterList";
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <ErrorAlert error={error} />
      <section className="row mt-4">
        <article className="col-sm-12 col-md-6 col-lg-3">
          <img
            alt={`${movie.title} Poster`}
            className="rounded"
            src={movie.image_url}
            style={{ width: "100%" }}
          />
        </article>
        <aside className="col-sm-12 col-md-6 col-lg-9">
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
