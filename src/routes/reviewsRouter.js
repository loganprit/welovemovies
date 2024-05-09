const express = require("express");
const router = express.Router();
const knex = require("../db/connection");

// DELETE a review
router.delete("/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const rowsAffected = await knex("reviews")
      .where("review_id", reviewId)
      .del();
    if (rowsAffected === 0) {
      return res.status(404).json({ error: "Review cannot be found." });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// UPDATE a review
router.put("/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  const { content, score } = req.body;
  try {
    const updatedReview = await knex("reviews")
      .where({ review_id: reviewId })
      .update({ content, score })
      .returning("*")
      .first();

    if (!updatedReview) {
      return res.status(404).json({ error: "Review cannot be found." });
    }

    const critic = await knex("critics")
      .where({ critic_id: updatedReview.critic_id })
      .first();

    res.json({ data: { ...updatedReview, critic } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
