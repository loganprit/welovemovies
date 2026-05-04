import type {
  ApiError,
  ApiRequestOptions,
  ApiResponse,
  Movie,
  Review,
  Theater,
} from "$lib/types/api";

const DEFAULT_API_URL = "http://localhost:5001";
const apiBaseUrl = (
  import.meta.env.PUBLIC_API_URL ||
  import.meta.env.VITE_API_URL ||
  DEFAULT_API_URL
).replace(/\/$/, "");

const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

const moviesCache = new Map<string, Promise<Movie[]>>();
const movieCache = new Map<number, Promise<Movie>>();
let theatersCache: Promise<Theater[]> | null = null;

async function fetchJson<T>(
  url: string | URL,
  options: ApiRequestOptions,
  onCancel: T,
): Promise<T> {
  try {
    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      const error = new Error(
        errorData.error || `HTTP Error ${response.status}`,
      ) as ApiError;
      error.status = response.status;
      error.name = "ApiError";
      throw error;
    }

    if (response.status === 204) {
      return null as T;
    }

    const payload = (await response.json()) as ApiResponse<T>;
    if (payload.error) {
      const error = new Error(payload.error) as ApiError;
      error.name = "ApiError";
      throw error;
    }

    return payload.data;
  } catch (error: unknown) {
    if (error instanceof Error && error.name !== "AbortError") {
      throw error;
    }

    return Promise.resolve(onCancel);
  }
}

async function populateReviews(
  movie: Movie,
  signal?: AbortSignal,
): Promise<Movie> {
  movie.reviews = await fetchJson<Review[]>(
    `${apiBaseUrl}/movies/${movie.movie_id}/reviews`,
    { headers, signal },
    [],
  );
  return movie;
}

async function populateTheaters(
  movie: Movie,
  signal?: AbortSignal,
): Promise<Movie> {
  movie.theaters = await fetchJson<Theater[]>(
    `${apiBaseUrl}/movies/${movie.movie_id}/theaters`,
    { headers, signal },
    [],
  );
  return movie;
}

type ListMoviesOptions = {
  isShowing?: boolean;
  signal?: AbortSignal;
};

export function listMovies(options: ListMoviesOptions = {}): Promise<Movie[]> {
  const { isShowing = false, signal } = options;
  const cacheKey = isShowing ? "now-showing" : "all";
  if (!moviesCache.has(cacheKey)) {
    const url = new URL(`${apiBaseUrl}/movies`);
    if (isShowing) {
      url.searchParams.set("is_showing", "true");
    }
    const moviesPromise = fetchJson<Movie[]>(url, { headers, signal }, [])
      .then((movies) =>
        Promise.all(movies.map((movie) => populateReviews(movie, signal))),
      )
      .catch((error: unknown) => {
        moviesCache.delete(cacheKey);
        throw error;
      });
    moviesCache.set(cacheKey, moviesPromise);
  }
  return moviesCache.get(cacheKey)!;
}

export function listTheaters(signal?: AbortSignal): Promise<Theater[]> {
  theatersCache ??= fetchJson<Theater[]>(
    `${apiBaseUrl}/theaters`,
    { headers, signal },
    [],
  ).catch((error: unknown) => {
    theatersCache = null;
    throw error;
  });
  return theatersCache;
}

export function readMovie(
  movieId: number,
  signal?: AbortSignal,
): Promise<Movie> {
  if (!movieCache.has(movieId)) {
    const moviePromise = fetchJson<Movie>(
      `${apiBaseUrl}/movies/${movieId}`,
      { headers, signal },
      {} as Movie,
    )
      .then((movie) => populateReviews(movie, signal))
      .then((movie) => populateTheaters(movie, signal))
      .catch((error: unknown) => {
        movieCache.delete(movieId);
        throw error;
      });
    movieCache.set(movieId, moviePromise);
  }
  return movieCache.get(movieId)!;
}

export async function readTheater(
  theaterId: number,
  signal?: AbortSignal,
): Promise<Theater | undefined> {
  const theaters = await listTheaters(signal);
  return theaters.find((theater) => theater.theater_id === theaterId);
}

export function prefetchMovie(movieId: number): void {
  void readMovie(movieId).catch(() => undefined);
}

export function prefetchTheater(theaterId: number): void {
  void readTheater(theaterId).catch(() => undefined);
}

export async function deleteReview(reviewId: number): Promise<void> {
  await fetchJson<void>(
    `${apiBaseUrl}/reviews/${reviewId}`,
    { method: "DELETE", headers },
    undefined,
  );
  movieCache.clear();
  moviesCache.clear();
}

export async function updateReview(
  reviewId: number,
  data: Partial<Review>,
): Promise<Review> {
  const review = await fetchJson<Review>(
    `${apiBaseUrl}/reviews/${reviewId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ data }),
    },
    {} as Review,
  );
  movieCache.clear();
  moviesCache.clear();
  return review;
}
