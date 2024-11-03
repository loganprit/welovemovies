import { Movie } from "../types/models";
import { ApiRequestOptions, ApiResponse, ApiError, Review, Theater } from "../types/api-types";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers: Headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * @param url - The url for the request
 * @param options - Any options for fetch
 * @param onCancel - Value to return if fetch call is aborted
 * @returns A promise that resolves to the `json` data or an error
 */
async function fetchJson<T>(
    url: string | URL,
    options: ApiRequestOptions,
    onCancel: T
): Promise<T> {
    try {
        const response = await fetch(url.toString(), options);

        if (!response.ok) {
            const error = new Error(`HTTP Error ${response.status}`) as ApiError;
            error.status = response.status;
            throw error;
        }

        if (response.status === 204) {
            return null as T;
        }

        const payload = await response.json() as ApiResponse<T>;

        if (payload.error) {
            throw new Error(payload.error);
        }
        return payload.data;
    } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
            console.error("API Error:", error.message);
            throw new Error(`API Error: ${error.message}`);
        }
        return Promise.resolve(onCancel);
    }
}

/**
 * Populates reviews for a movie
 */
function populateReviews(signal?: AbortSignal) {
    return async (movie: Movie): Promise<Movie> => {
        const url = `${API_BASE_URL}/movies/${movie.movie_id}/reviews`;
        movie.reviews = await fetchJson<Review[]>(
            url,
            { headers, signal },
            []
        );
        return movie;
    };
}

/**
 * Populates theaters for a movie
 */
function populateTheaters(signal?: AbortSignal) {
    return async (movie: Movie): Promise<Movie> => {
        const url = `${API_BASE_URL}/movies/${movie.movie_id}/theaters`;
        movie.theaters = await fetchJson<Theater[]>(
            url,
            { headers, signal },
            []
        );
        return movie;
    };
}

/**
 * Retrieves all existing movies and populates the `reviews` property
 * @param signal - AbortSignal for cancelling the request
 * @returns A promise that resolves to a possibly empty array of movies saved in the database
 */
export async function listMovies(signal?: AbortSignal): Promise<Movie[]> {
    const url = new URL(`${API_BASE_URL}/movies?is_showing=true`);
    const addReviews = populateReviews(signal);
    return await fetchJson<Movie[]>(url, { headers, signal }, [])
        .then((movies) => Promise.all(movies.map(addReviews)));
}

/**
 * Retrieves all existing theaters
 * @param signal - AbortSignal for cancelling the request
 * @returns A promise that resolves to a possibly empty array of theaters saved in the database
 */
export async function listTheaters(signal?: AbortSignal): Promise<Theater[]> {
    const url = new URL(`${API_BASE_URL}/theaters`);
    return await fetchJson<Theater[]>(url, { headers, signal }, []);
}

/**
 * Retrieves a movie by ID and populates the `reviews` property
 * @param movieId - The ID of the movie to retrieve
 * @param signal - AbortSignal for cancelling the request
 * @returns A promise that resolves to a possibly empty array of movies saved in the database
 */
export async function readMovie(movieId: number, signal?: AbortSignal): Promise<Movie> {
    const url = new URL(`${API_BASE_URL}/movies/${movieId}`);
    const addReviews = populateReviews(signal);
    const addTheaters = populateTheaters(signal);
    return await fetchJson<Movie>(url, { headers, signal }, {} as Movie)
        .then(addReviews)
        .then(addTheaters);
}

/**
 * Deletes a review by ID
 * @param reviewId - The ID of the review to delete
 * @returns A promise that resolves when the deletion is complete
 */
export async function deleteReview(reviewId: number): Promise<void> {
    const url = `${API_BASE_URL}/reviews/${reviewId}`;
    return await fetchJson<void>(url, { method: "DELETE", headers }, undefined);
}

/**
 * Updates a review by ID
 * @param reviewId - The ID of the review to update
 * @param data - The updated review data
 * @returns A promise that resolves to the updated review
 */
export async function updateReview(reviewId: number, data: Partial<Review>): Promise<Review> {
    const url = `${API_BASE_URL}/reviews/${reviewId}`;
    const options: ApiRequestOptions = {
        method: "PUT",
        headers,
        body: JSON.stringify({ data }),
    };
    return await fetchJson<Review>(url, options, {} as Review);
}
