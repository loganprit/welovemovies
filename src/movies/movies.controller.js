const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to check if movie exists
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    // If movie exists, store the movie to res.locals.movie and call next()
    res.locals.movie = movie;
    return next();
  }
  // If movie does not exist, return 404 error
  res
    .status(404)
    .json({ error: `Movie with ID ${req.params.movieId} cannot be found` });
}

// Controller functions
// Handles GET requests to list all movies
async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = await service.list(is_showing);
  res.json({ data });
}

// Handles GET requests to read a single movie
async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

// Handles GET requests to read theaters for a single movie
async function readTheaters(req, res, next) {
  const data = await service.readTheaters(req.params.movieId);
  res.json({ data });
}

// Handles GET requests to read reviews for a single movie
async function readReviews(req, res, next) {
  const data = await service.readReviews(req.params.movieId);
  res.json({ data });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
  readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
  readReviews: [asyncErrorBoundary(movieExists), readReviews],
};
