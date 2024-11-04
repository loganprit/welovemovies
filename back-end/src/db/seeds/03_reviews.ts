import { Knex } from "knex";
import { Review, Movie, Critic } from "../../types/api";

const REVIEW_CONTENT = `A masterful film that expertly balances stunning visuals with emotional depth. The cast delivers powerful performances that will stay with you long after viewing.`;

type CriticId = Pick<Critic, "critic_id">;
type MovieId = Pick<Movie, "movie_id">;
type ReviewSeed = Omit<Review, "review_id" | "created_at" | "updated_at">;

/**
 * Generates review records for each critic-movie combination
 */
const generateReviews = (
  criticIds: CriticId[],
  movieIds: MovieId[]
): ReviewSeed[] => {
  return movieIds
    .map((movie) => 
      criticIds.map((critic) => ({
        content: REVIEW_CONTENT,
        score: Math.ceil(Math.random() * 5),
        critic_id: Number(critic.critic_id),
        movie_id: Number(movie.movie_id),
      }))
    )
    .flat()
    .filter((review): review is ReviewSeed => 
      Boolean(review.content) && 
      review.critic_id > 0 &&
      review.movie_id > 0 &&
      review.score > 0
    );
};

/**
 * Seed function to populate the reviews table
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
