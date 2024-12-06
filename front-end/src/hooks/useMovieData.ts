import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listMovies, readMovie } from "../utils/api";
import { Movie } from "../types/models";

// Cache configuration
const CACHE_CONFIG = {
  STALE_TIME: 30 * 60 * 1000, // 30 minutes
  GC_TIME: 60 * 60 * 1000,    // 1 hour
  RETRY_DELAY: 1000,
  RETRIES: 2,
};

export const useMovieData = (movieId?: number) => {
  const queryClient = useQueryClient();

  // Query for all movies with persistent caching
  const moviesQuery = useQuery({
    queryKey: ["movies"],
    queryFn: () => listMovies(),
    staleTime: CACHE_CONFIG.STALE_TIME,
    gcTime: CACHE_CONFIG.GC_TIME,
    retry: CACHE_CONFIG.RETRIES,
    retryDelay: CACHE_CONFIG.RETRY_DELAY,
    placeholderData: (prev) => prev,
    select: (data) => {
      data.forEach(movie => {
        if (movie.image_url) {
          new Image().src = movie.image_url;
        }
      });
      return data;
    }
  });

  // Individual movie query with persistent caching
  const movieQuery = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => readMovie(movieId!),
    staleTime: CACHE_CONFIG.STALE_TIME,
    gcTime: CACHE_CONFIG.GC_TIME,
    enabled: !!movieId,
    placeholderData: (prev) => prev,
  });

  // Prefetch function with adjacent movies
  const prefetchMovie = async (id: number): Promise<void> => {
    try {
      // Prefetch the target movie
      await queryClient.prefetchQuery({
        queryKey: ["movie", id],
        queryFn: () => readMovie(id),
        staleTime: CACHE_CONFIG.STALE_TIME,
      });

      // Get current movies list from cache
      const movies = queryClient.getQueryData<Movie[]>(["movies"]);
      if (!movies) return;

      // Find current movie index
      const currentIndex = movies.findIndex(m => m.movie_id === id);
      if (currentIndex === -1) return;

      // Prefetch adjacent movies
      const adjacentIds = [
        movies[currentIndex - 1]?.movie_id,
        movies[currentIndex + 1]?.movie_id,
      ].filter(Boolean);

      await Promise.all(
        adjacentIds.filter((adjId): adjId is number => typeof adjId === 'number')
          .map(adjId =>
            queryClient.prefetchQuery({
              queryKey: ["movie", adjId],
              queryFn: () => readMovie(adjId),
              staleTime: CACHE_CONFIG.STALE_TIME,
            })
          )
      );
    } catch (error) {
      console.error("Prefetch error:", error);
    }
  };

  // Cache warming on initial load
  React.useEffect(() => {
    if (moviesQuery.data) {
      const firstFewMovies = moviesQuery.data.slice(0, 4);
      firstFewMovies.forEach(movie => {
        queryClient.prefetchQuery({
          queryKey: ["movie", movie.movie_id],
          queryFn: () => readMovie(movie.movie_id),
          staleTime: CACHE_CONFIG.STALE_TIME,
        });
      });
    }
  }, [moviesQuery.data, queryClient]);

  return {
    movies: moviesQuery.data ?? [],
    currentMovie: movieQuery.data,
    isLoading: moviesQuery.isLoading || (!!movieId && movieQuery.isLoading),
    error: moviesQuery.error || movieQuery.error,
    prefetchMovie,
  };
}; 