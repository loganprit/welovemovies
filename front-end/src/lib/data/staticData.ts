import type { Critic, Movie, Review, Theater } from "$lib/types/api";
import staticDataJson from "./static-data.json";

interface MovieTheater {
  movie_id: number;
  theater_id: number;
  is_showing: boolean;
}

interface StaticData {
  movies: Movie[];
  critics: Critic[];
  theaters: Theater[];
  movies_theaters: MovieTheater[];
  reviews: Review[];
}

interface ReviewOverrides {
  deletedReviewIds?: number[];
  reviewScores?: Record<number, number>;
}

const staticData = staticDataJson as StaticData;

const criticsById = new Map(
  staticData.critics.map((critic) => [critic.critic_id, critic]),
);
const moviesById = new Map(
  staticData.movies.map((movie) => [movie.movie_id, movie]),
);
const theatersById = new Map(
  staticData.theaters.map((theater) => [theater.theater_id, theater]),
);

function compareById<T extends { movie_id?: number; theater_id?: number }>(
  left: T,
  right: T,
) {
  return (
    (left.movie_id ?? left.theater_id ?? 0) -
    (right.movie_id ?? right.theater_id ?? 0)
  );
}

function movieIsShowing(movieId: number) {
  return staticData.movies_theaters.some(
    (join) => join.movie_id === movieId && join.is_showing,
  );
}

function attachCritic(
  review: Review,
  reviewScores: Record<number, number> = {},
): Review {
  return {
    ...review,
    score: reviewScores[review.review_id] ?? review.score,
    critic: criticsById.get(review.critic_id) ?? null,
  };
}

function readReviewsForMovie(movieId: number, overrides: ReviewOverrides = {}) {
  const deletedReviewIds = new Set(overrides.deletedReviewIds ?? []);

  return staticData.reviews
    .filter(
      (review) =>
        review.movie_id === movieId && !deletedReviewIds.has(review.review_id),
    )
    .map((review) => attachCritic(review, overrides.reviewScores))
    .sort((left, right) => left.review_id - right.review_id);
}

function readTheatersForMovie(movieId: number) {
  return staticData.movies_theaters
    .filter((join) => join.movie_id === movieId)
    .map((join) => {
      const theater = theatersById.get(join.theater_id);
      if (!theater) return undefined;

      return {
        ...theater,
        is_showing: join.is_showing,
        movie_id: join.movie_id,
      };
    })
    .filter(
      (
        theater,
      ): theater is Theater & { is_showing: boolean; movie_id: number } =>
        Boolean(theater),
    )
    .sort(compareById);
}

function readMoviesForTheater(theaterId: number) {
  return staticData.movies_theaters
    .filter((join) => join.theater_id === theaterId)
    .map((join) => {
      const movie = moviesById.get(join.movie_id);
      if (!movie) return undefined;

      return {
        ...movie,
        is_showing: join.is_showing,
        theater_id: join.theater_id,
      };
    })
    .filter(
      (movie): movie is Movie & { is_showing: boolean; theater_id: number } =>
        Boolean(movie),
    )
    .sort(compareById);
}

export function listMovies(options: { isShowing?: boolean } = {}) {
  return staticData.movies
    .filter((movie) => !options.isShowing || movieIsShowing(movie.movie_id))
    .map((movie) => ({ ...movie, is_showing: movieIsShowing(movie.movie_id) }))
    .sort(compareById);
}

export function readMovie(movieId: number, overrides: ReviewOverrides = {}) {
  const movie = moviesById.get(movieId);
  if (!movie) return undefined;

  return {
    ...movie,
    is_showing: movieIsShowing(movie.movie_id),
    reviews: readReviewsForMovie(movie.movie_id, overrides),
    theaters: readTheatersForMovie(movie.movie_id),
  };
}

export function listTheaters() {
  return staticData.theaters
    .map((theater) => ({
      ...theater,
      movies: readMoviesForTheater(theater.theater_id),
    }))
    .sort(compareById);
}
