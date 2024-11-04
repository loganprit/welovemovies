import { Movie, Theater, ReviewWithCritic } from "../types/api";
import knex from "../db/connection";

/**
 * Retrieves a list of movies, optionally filtered by showing status
 * @param isShowing - Optional boolean to filter movies currently showing
 * @returns Promise resolving to array of movies
 */
async function list(isShowing?: boolean): Promise<Movie[]> {
  const query = knex("movies as m");
  
  if (isShowing) {
    return query
      .distinct("m.*")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true });
  }
  
  return query.select("*");
}

/**
 * Retrieves a single movie by ID
 * @param movieId - The ID of the movie to retrieve
 * @returns Promise resolving to movie or undefined if not found
 */
async function read(movieId: number): Promise<Movie | undefined> {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

/**
 * Retrieves all theaters showing a specific movie
 * @param movieId - The ID of the movie
 * @returns Promise resolving to array of theaters
 */
async function readTheaters(movieId: number): Promise<Theater[]> {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

/**
 * Retrieves all reviews for a specific movie with critic details
 * @param movieId - The ID of the movie
 * @returns Promise resolving to array of reviews with critic information
 */
async function readReviews(movieId: number): Promise<ReviewWithCritic[]> {
  const reviews = await knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.*",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name"
    )
    .where({ "r.movie_id": movieId });

  return reviews.map((review) => {
    const critic = {
      critic_id: review["critic:critic_id"],
      preferred_name: review["critic:preferred_name"],
      surname: review["critic:surname"],
      organization_name: review["critic:organization_name"],
      created_at: review.created_at,
      updated_at: review.updated_at,
    };

    const { 
      ["critic:critic_id"]: _,
      ["critic:preferred_name"]: __,
      ["critic:surname"]: ___,
      ["critic:organization_name"]: ____,
      ...reviewData
    } = review;

    return {
      ...reviewData,
      critic,
    } as ReviewWithCritic;
  });
}

export {
  list,
  read,
  readTheaters,
  readReviews,
};
