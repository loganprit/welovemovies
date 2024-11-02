import request from "supertest";
import app from "../../src/app";
import knex from "../../src/db/connection";
import { Review } from "../../src/types/api";

describe("Review Routes", () => {
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

  describe("PUT /reviews/:reviewId", () => {
    test("should return a 404 if the ID given does not match any ID in the database", async () => {
      const response = await request(app).put("/reviews/999999999").send({});

      expect(response.body.error).toMatch(/cannot be found/i);
      expect(response.statusCode).toBe(404);
    });

    test("updates an existing review, returning the updated review including the critic info", async () => {
      const data = { content: "Content" };
      const previous = await knex<Review>("reviews").first();

      if (!previous) {
        throw new Error("No review found in database");
      }

      const response = await request(app)
        .put(`/reviews/${previous.review_id}`)
        .send({ data });

      expect(response.body.error).toBeUndefined();
      expect(response.body.data).toEqual(
        expect.objectContaining({
          ...previous,
          content: "Content",
          created_at: expect.any(String),
          updated_at: expect.any(String),
          critic: expect.objectContaining({
            preferred_name: expect.any(String),
            surname: expect.any(String),
            organization_name: expect.any(String),
          }),
        })
      );

      const updatedReview = await knex<Review>("reviews")
        .where({ review_id: previous.review_id })
        .first();

      expect(updatedReview?.content).toBe("Content");
    });
  });

  describe("DELETE /reviews/:reviewId", () => {
    test("should return a 404 if the ID given does not match any ID in the database", async () => {
      const response = await request(app).delete("/reviews/9999").send({});
      expect(response.body.error).toBeDefined();
      expect(response.statusCode).toBe(404);
    });

    test("should delete the review record when given an existing review_id", async () => {
      const previous = await knex<Review>("reviews").first();

      if (!previous) {
        throw new Error("No review found in database");
      }

      const response = await request(app).delete(
        `/reviews/${previous.review_id}`
      );

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(204);

      const deletedReview = await knex<Review>("reviews")
        .where({
          review_id: previous.review_id,
        })
        .first();

      expect(deletedReview).toBeUndefined();
    });
  });
});
