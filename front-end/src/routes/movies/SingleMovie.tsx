import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../shared/theme/ThemeContext";
import { useMovieData } from "../../hooks/useMovieData";
import MovieDetails from "./MovieDetails";
import TheaterList from "../theaters/TheaterList";
import ReviewList from "../../shared/components/reviews/ReviewList";
import ErrorAlert from "../../shared/ErrorAlert";
import { Review } from "../../types/api-types";
import { deleteReview, updateReview } from "../../utils/api";
import { useQueryClient } from "@tanstack/react-query";
import DetailedMovieSkeleton from "../../shared/components/MovieCard/DetailedSkeleton";

const FullMovie: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { theme } = useTheme();
  const { currentMovie: movie, isLoading, error } = useMovieData(Number(movieId));
  const queryClient = useQueryClient();

  // Scroll to top when movie changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  const handleDeleteReview = async (review: Review): Promise<void> => {
    try {
      await deleteReview(review.review_id);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["movie", Number(movieId)] });
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const handleUpdateScore = async (review: Review, score: number): Promise<void> => {
    try {
      await updateReview(review.review_id, { score });
      queryClient.invalidateQueries({ queryKey: ["movie", Number(movieId)] });
    } catch (error) {
      console.error("Failed to update review score:", error);
    }
  };

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (isLoading || !movie) {
    return <DetailedMovieSkeleton variant="full" />;
  }

  return (
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <div className="container mx-auto px-4 py-8">
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
      </div>
    </main>
  );
};

export default FullMovie;
