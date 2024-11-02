import knex from "../db/connection";
import type { Review, ReviewWithCritic } from "../types/api";

// Function to read a single review
export function read(reviewId: number): Promise<Review | undefined> {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

// Function to delete a review
export function destroy(reviewId: number): Promise<number> {
  return knex("reviews")
    .where({ review_id: reviewId })
    .del();
}

// Function to update a review
export function update(updatedReview: Partial<Review> & { review_id: number }): Promise<Review> {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => read(updatedReview.review_id)) as Promise<Review>;
}

// Function to read a single review with critic information
export function readWithCritic(reviewId: number): Promise<ReviewWithCritic[]> {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.*",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.critic_id",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.review_id": reviewId })
    .then((rows) => {
      const reviews = rows.map((row) => ({
        review_id: row.review_id,
        content: row.content,
        score: row.score,
        movie_id: row.movie_id,
        critic_id: row.critic_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        critic: {
          critic_id: row.critic_id,
          preferred_name: row.preferred_name,
          surname: row.surname,
          organization_name: row.organization_name,
          created_at: row.critic_created_at,
          updated_at: row.critic_updated_at,
        },
      }));
      return reviews as ReviewWithCritic[];
    });
}
