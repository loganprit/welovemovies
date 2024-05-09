const express = require("express");
const router = express.Router();
const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Reduce function setup
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"],
});

router.get("/", async (req, res, next) => {
  try {
    const theaters = await knex("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .join("movies as m", "mt.movie_id", "m.movie_id")
      .select(
        "t.theater_id",
        "t.name",
        "t.address_line_1",
        "t.address_line_2",
        "t.city",
        "t.state",
        "t.zip",
        "t.created_at",
        "t.updated_at",
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url",
        "m.created_at as movie_created_at",
        "m.updated_at as movie_updated_at",
        "mt.is_showing",
        "mt.theater_id as movie_theater_id"
      )
      .where({ "mt.is_showing": true });

    const reducedTheaters = reduceMovies(theaters);
    res.json({ data: reducedTheaters });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
