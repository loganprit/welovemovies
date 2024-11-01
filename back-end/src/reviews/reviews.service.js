const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// Function to read a single review
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

// Function to delete a review
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

// Function to update a review
function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => read(updatedReview.review_id)); // Retrieve the updated record
}

// Function to read a single review with critic information
function readWithCritic(review_id) {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("*")
    .where({ review_id })
    .then(reduceReview);
}

// Helper function to reduce critic properties
const reduceReview = reduceProperties("critic_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
});

module.exports = {
  read,
  readWithCritic,
  update,
  delete: destroy,
};
