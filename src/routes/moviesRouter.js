const express = require("express");
const router = express.Router();
const knex = require("../db/connection");

// GET all movies
router.get("/", async (req, res, next) => {
  try {
    const { is_showing } = req.query;
    const query = knex("movies");
    if (is_showing === "true") {
      query
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .where("movies_theaters.is_showing", true)
        .distinct("movies.*");
    }
    const movies = await query;
    res.json({ data: movies });
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
});

// GET a single movie by ID
router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await knex("movies").where("movie_id", movieId).first();
    if (!movie) {
      return res.status(404).json({ error: "Movie cannot be found." });
    }
    res.json({ data: movie });
  } catch (error) {
    next(error);
  }
});

// GET theaters for a single movie
router.get("/:movieID/theaters", async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const theaters = await knex("theaters")
      .join(
        "movies_theaters",
        "theaters.theater_id",
        "movies_theaters.theater_id"
      )
      .where("movies_theaters.movie_id", movieID)
      .select(
        "theaters.*",
        "movies_theaters.is_showing",
        "movies_theaters.movie_id"
      );
    res.json({ data: theaters });
  } catch (error) {
    next(error);
  }
});

// GET reviews for a single movie
router.get("/:movieId/reviews", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const reviews = await knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .where({ "r.movie_id": movieId })
      .select("r.*", knex.raw("to_json(c.*) as critic"));
    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
});

// POST a new review for a movie
router.get("/:movieId/critics", (req, res) => {
  res.status(404).json({ error: "Route not found." });
});

module.exports = router;
