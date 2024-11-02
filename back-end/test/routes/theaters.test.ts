import request from "supertest";
import app from "../../src/app";
import knex from "../../src/db/connection";
import { TheaterWithMovies } from "../../src/types/api";

describe("Theater Routes", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(undefined, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(undefined, true).then(() => knex.destroy());
  });

  describe("GET /theaters", () => {
    test("should return a list of all theaters, including the 'movies' each theatre is showing", async () => {
      const expectedHollywoodTheatre: Partial<TheaterWithMovies> = {
        name: "Hollywood Theatre",
        address_line_1: "4122 NE Sandy Blvd.",
        address_line_2: "",
        city: "Portland",
        state: "OR",
        zip: "97212",
        movies: expect.arrayContaining([
          expect.objectContaining({
            title: "Spirited Away",
            runtime_in_minutes: 125,
            rating: "PG",
          }),
        ]),
      };

      const response = await request(app).get("/theaters");

      expect(response.body.error).toBeUndefined();

      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining(expectedHollywoodTheatre),
        ])
      );
      expect(response.body.data[0].movies).toHaveLength(16);
      expect(response.body.data).toHaveLength(3);
    });
  });
});
