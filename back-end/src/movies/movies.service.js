const knex = require("../db/connection");

// List all movies or only movies that are showing
function list(is_showing) {
  if (is_showing) {
    // If is_showing is true, return only movies that are showing
    return isShowing();
  }
  // If is_showing is not true, return all movies
  return knex("movies").select("*");
}

// Helper function to return only movies that are showing
function isShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where("mt.is_showing", true)
    .select("m.*");
}

// Function to read a single movie
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

// Helper function to read theaters for a single movie
function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .where({ "m.movie_id": movieId })
    .select(
      "t.theater_id",
      "name",
      "address_line_1",
      "address_line_2",
      "city",
      "state",
      "zip",
      "t.created_at",
      "t.updated_at",
      "is_showing",
      "m.movie_id"
    );
}

// Helper function to read reviews for a single movie
function readReviews(movieId) {
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
        };
        delete review["critic:critic_id"];
        delete review["critic:preferred_name"];
        delete review["critic:surname"];
        delete review["critic:organization_name"];
        return {
          ...review,
          critic,
        };
      });
    });
}

module.exports = {
  list,
  read,
  isShowing,
  readTheaters,
  readReviews,
};
