import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { seed as seedMovies } from "../../back-end/src/db/seeds/01_movies";
import { seed as seedCritics } from "../../back-end/src/db/seeds/02_critics";
import { seed as seedTheaters } from "../../back-end/src/db/seeds/04_theaters";

type SeedTable = "movies" | "critics" | "theaters";
type SeedRow = Record<string, unknown>;
type RecordedRows = Record<SeedTable, SeedRow[]>;

const createdAt = "2026-01-01T00:00:00.000Z";
const reviewContent =
  "A masterful film that expertly balances stunning visuals with emotional depth. The cast delivers powerful performances that will stay with you long after viewing.";
const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(projectRoot, "src/lib/data/static-data.json");

function createRecordingKnex(rows: RecordedRows) {
  return ((tableName: SeedTable) => ({
    insert: async (records: SeedRow[]) => {
      rows[tableName].push(...records);
    },
  })) as never;
}

function withIds(rows: SeedRow[], idField: string) {
  return rows.map((row, index) => ({
    [idField]: index + 1,
    ...row,
    created_at: createdAt,
    updated_at: createdAt,
  }));
}

function generateReviews(movies: SeedRow[], critics: SeedRow[]) {
  let reviewId = 1;
  return movies.flatMap((movie) =>
    critics.map((critic) => {
      const movieId = Number(movie.movie_id);
      const criticId = Number(critic.critic_id);
      const score = ((movieId + criticId - 2) % 5) + 1;

      return {
        review_id: reviewId++,
        content: reviewContent,
        score,
        critic_id: criticId,
        movie_id: movieId,
        created_at: createdAt,
        updated_at: createdAt,
      };
    }),
  );
}

function generateMovieTheaters(movies: SeedRow[], theaters: SeedRow[]) {
  return movies.flatMap((movie) =>
    theaters.map((theater) => ({
      movie_id: Number(movie.movie_id),
      theater_id: Number(theater.theater_id),
      is_showing: true,
    })),
  );
}

async function main() {
  const recordedRows: RecordedRows = {
    movies: [],
    critics: [],
    theaters: [],
  };
  const knex = createRecordingKnex(recordedRows);

  await seedMovies(knex);
  await seedCritics(knex);
  await seedTheaters(knex);

  const movies = withIds(recordedRows.movies, "movie_id");
  const critics = withIds(recordedRows.critics, "critic_id");
  const theaters = withIds(recordedRows.theaters, "theater_id");
  const reviews = generateReviews(movies, critics);
  const movieTheaters = generateMovieTheaters(movies, theaters);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(
      {
        movies,
        critics,
        theaters,
        movies_theaters: movieTheaters,
        reviews,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`movies: ${movies.length}`);
  console.log(`critics: ${critics.length}`);
  console.log(`theaters: ${theaters.length}`);
  console.log(`reviews: ${reviews.length}`);
  console.log(`movies_theaters: ${movieTheaters.length}`);
}

await main();
