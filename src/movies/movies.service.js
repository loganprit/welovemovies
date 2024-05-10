const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const reduceReview = require("../reviews/reviews.service");

function list(is_showing) {
  if (is_showing) {
    return isShowing();
  }
  return knex("movies").select("*");
}

// "/:movieId?is_showing=true"
function isShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where("mt.is_showing", true)
    .select("m.*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

//"/:movieId/theaters"
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

// "/:movieId/reviews"
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
      knex.raw(`json_object(
          'critic_id', c.critic_id,
          'preferred_name', c.preferred_name,
          'surname', c.surname,
          'organization_name', c.organization_name
        ) as critic`)
    )
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      return reviews.map((review) => {
        return {
          ...review,
          critic: JSON.parse(review.critic),
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
