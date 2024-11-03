import { Knex } from "knex";
import { Review, Movie, Critic } from "../../types/api";

// Sample review content
const content = `Lorem markdownum priores iactate receptus margine in motu ferreus pastor. Teneat
tua opifex regina, adest; similisque nec, me convivia ortus.

Est sontes praemia fatorum diversosque innubere rursus. Tanto inter commenta
tremulasque tergo donec Apollinei mearum: Hector colorum horruit.

> Cur repulsa matrem frequentes parvum coniuge ad nisi leto, ira. Orbis levatus
> o coniugis longis confinia *bello* rursus quem Atridae indulgere! Sanguine o
> operi flammas sorores suffundit et ilia. Nais edentem tamen. Acta munera enixa
> ad terram!

Sint sed per oppugnant Medusae Pagasaeae undique rebus cernit terram delituit
dilapsa tigres. Ait omne conatur nomen cumque, ad Minoa magna *dolentes*,
ageret. Sum addat, et unum iunge, aberant his indigenae facundia?

> Perdidit astra, si maternis sibi, Phoebi protinus senecta digitos. Atque
> suique **Lyrnesia**, prosunt suae mihi aqua, te!

Subsedit tantaque vulnera totiens aptos vivit digna pectoraque mutua. Duro ante
tibi perhorruit praedelassat simulat turis loco hunc dederat viscera scilicet
transitus quam longius aenea, concussaque hoc mille.

Ut erat. Tibi Themin corpore saepes.`;

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
    .map(({ movie_id }) => {
      return criticIds.map(({ critic_id }) => {
        return {
          content,
          score: Math.ceil(Math.random() * 5),
          critic_id,
          movie_id,
        };
      });
    })
    .reduce((a, b) => a.concat(b), [])
    .filter((review): review is ReviewSeed => Boolean(review.content));
};

/**
 * Seed function to populate the reviews table with initial data
 * @param knex - The Knex instance
 * @returns Promise that resolves when seeding is complete
 */
export async function seed(knex: Knex): Promise<void> {
  const criticIds = await knex("critics").select("critic_id");
  const movieIds = await knex("movies").select("movie_id");

  const reviews = generateReviews(criticIds, movieIds);
  await knex("reviews").insert(reviews);
}
