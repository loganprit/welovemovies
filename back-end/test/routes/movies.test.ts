import request from "supertest";
import app from "../../src/app";
import knex from "../../src/db/connection";
import { Movie, ReviewWithCritic } from "../../src/types/api";

describe("Movie Routes", () => {
  beforeAll(async () => {
    await knex.migrate.forceFreeMigrationsLock();
    await knex.migrate.rollback(undefined, true);
    await knex.migrate.latest();
    await knex.seed.run();
  });

  beforeEach(async () => {
    await knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(undefined, true).then(() => knex.destroy());
  });

  describe("GET /movies", () => {
    test("should return a list of all movies by default", async () => {
      const response = await request(app).get("/movies");

      const data = response.body.data;

      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "Interstellar",
            rating: "PG-13",
            runtime_in_minutes: 169,
          }),
        ])
      );
      expect(data).toHaveLength(16);
    });

    test("should return active movies if `is_showing=true` is provided", async () => {
      const previous = await knex<Movie>("movies").first();
      
      if (!previous) {
        throw new Error("No movie found in database");
      }

      await knex("movies_theaters")
        .update({ is_showing: false })
        .where({ movie_id: previous.movie_id });

      const response = await request(app).get("/movies?is_showing=true");

      expect(response.body.data).toHaveLength(15);
    });
  });

  describe("GET /movies/:movieId", () => {
    test("should return a 404 if the ID given does not match any ID in the database", async () => {
      const response = await request(app).get("/movies/999999999");
      expect(response.body.error).toBeDefined();
      expect(response.statusCode).toBe(404);
    });

    test("should return movie details when given an existing ID", async () => {
      const previous = await knex<Movie>("movies").first();

      if (!previous) {
        throw new Error("No movie found in database");
      }

      const response = await request(app).get(`/movies/${previous.movie_id}`);

      expect(response.body.error).toBeUndefined();
      expect(response.body.data).toEqual(previous);
    });

    test("/theaters returns the theaters for the specified movie_id", async () => {
      const previous = await knex<Movie>("movies").first();

      if (!previous) {
        throw new Error("No movie found in database");
      }

      const response = await request(app).get(
        `/movies/${previous.movie_id}/theaters`
      );

      expect(response.body.error).toBeUndefined();
      expect(response.body.data[0]).toHaveProperty("name", "Regal City Center");
      expect(response.body.data).toHaveLength(3);
    });

    test("GET `/movies/:movieId/reviews` returns the reviews, with critic property, for the specified movie_id", async () => {
      const previous = await knex<Movie>("movies").first();

      if (!previous) {
        throw new Error("No movie found in database");
      }

      const response = await request(app).get(
        `/movies/${previous.movie_id}/reviews`
      );

      expect(response.body.error).toBeUndefined();
      expect(response.body.data).toHaveLength(7);
      response.body.data.forEach((review: ReviewWithCritic) => {
        expect(review).toHaveProperty("movie_id", previous.movie_id);
        expect(review).toHaveProperty(
          "critic",
          expect.objectContaining({
            preferred_name: expect.any(String),
            surname: expect.any(String),
            organization_name: expect.any(String),
          })
        );
      });
    });

    test("should not include critics anywhere for the path `/movies/:movieId/critics`", async () => {
      const previous = await knex<Movie>("movies").first();

      if (!previous) {
        throw new Error("No movie found in database");
      }

      const response = await request(app).get(
        `/movies/${previous.movie_id}/critics`
      );

      expect(response.body.error).toBeDefined();
      expect(response.statusCode).toBe(404);
    });
  });
});
