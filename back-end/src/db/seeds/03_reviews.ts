import { Knex } from "knex";
import { Review, Movie, Critic } from "../../types/api";

// Sample review content for seeding the database
const content = `A masterful film that expertly balances stunning visuals with emotional depth. The cast delivers powerful performances that will stay with you long after viewing.`;

type CriticId = Pick<Critic, "critic_id">;
type MovieId = Pick<Movie, "movie_id">;
type ReviewSeed = Omit<Review, "review_id" | "created_at" | "updated_at">;

/**
 * Generates review records for each combination of critic and movie
 * @param criticIds - Array of critic IDs from the database
 * @param movieIds - Array of movie IDs from the database
 * @returns Array of review records ready for insertion
 */
const generateReviews = (
  criticIds: CriticId[],
  movieIds: MovieId[]
): ReviewSeed[] => {
  return movieIds
    .map((movieRow) => {
      return criticIds.map((criticRow) => {
        return {
          content,
          score: Math.ceil(Math.random() * 5),
          critic_id: Number(criticRow.critic_id),
          movie_id: Number(movieRow.movie_id),
        };
      });
    })
    .reduce((a, b) => a.concat(b), [])
    .filter((review): review is ReviewSeed => 
      Boolean(review.content) && 
      review.critic_id > 0 &&
      review.movie_id > 0 &&
      review.score > 0
    );
};

/**
 * Seed function to populate the reviews table with initial data
 * @param knex - The Knex instance
 * @returns Promise that resolves when seeding is complete
 */
export async function seed(knex: Knex): Promise<void> {
  const criticIds = await knex("critics").select("critic_id");
  const movieIds = await knex("movies").select("movie_id");

  if (!criticIds.length || !movieIds.length) {
    throw new Error("No critics or movies found in the database");
  }

  const reviews = generateReviews(criticIds, movieIds);
  
  if (!reviews.length) {
    throw new Error("No valid reviews generated");
  }
  
  await knex("reviews").insert(reviews);
}
