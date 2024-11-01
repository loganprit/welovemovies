const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to check if review exists in the database
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    // If review exists, store the review to res.locals.review and call next()
    res.locals.review = review;
    return next();
  }
  // If review does not exist, return 404 error
  res
    .status(404)
    .json({ error: `Review with id: ${req.params.reviewId} cannot be found` });
}

// Controller functions
// Function to delete a review
async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

// Function to update a review
async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await service.update(updatedReview);
  const updated = await service.readWithCritic(res.locals.review.review_id);
  res.json({ data: updated[0] });
}

// Function to read a review
async function read(req, res, next) {
  const data = await service.read(req.params.reviewId);
  res.json({ data });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
};
