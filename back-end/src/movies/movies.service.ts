import { Movie, Theater, ReviewWithCritic } from "../types/api";
import knex from "../db/connection";

// Function to list all movies, optionally filtered by showing status
async function list(isShowing?: boolean): Promise<Movie[]> {
  if (isShowing) {
    return knex("movies as m")
      .distinct("m.*")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true });
  }
  return knex("movies").select("*");
}

// Function to read a single movie by ID
async function read(movieId: number): Promise<Movie | undefined> {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first();
}

// Function to read theaters showing a specific movie
async function readTheaters(movieId: number): Promise<Theater[]> {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

// Function to read reviews for a specific movie
async function readReviews(movieId: number): Promise<ReviewWithCritic[]> {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name"
    )
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      return reviews.map((review) => {
        const critic = {
          critic_id: review["critic:critic_id"],
          preferred_name: review["critic:preferred_name"],
          surname: review["critic:surname"],
          organization_name: review["critic:organization_name"],
          created_at: review.created_at,
          updated_at: review.updated_at,
        };
        
        // Remove the critic: prefixed properties
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
    });
}

export {
  list,
  read,
  readTheaters,
  readReviews,
};
