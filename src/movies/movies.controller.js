const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  res
    .status(404)
    .json({ error: `Movie with ID ${req.params.movieId} cannot be found` });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = await service.list(is_showing);
  res.json({ data });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function readTheaters(req, res, next) {
  const data = await service.readTheaters(req.params.movieId);
  res.json({ data });
}

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
