import { Router } from "express";
import controller from "./movies.controller";
import methodNotAllowed from "../errors/methodNotAllowed";

const router: Router = Router({ mergeParams: true });

/**
 * @route GET /movies
 * @description List all movies, optionally filtered by is_showing
 */
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

/**
 * @route GET /movies/:movieId
 * @description Get a specific movie by ID
 */
router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

/**
 * @route GET /movies/:movieId/theaters
 * @description Get all theaters showing a specific movie
 */
router
  .route("/:movieId/theaters")
  .get(controller.readTheaters)
  .all(methodNotAllowed);

/**
 * @route GET /movies/:movieId/reviews
 * @description Get all reviews for a specific movie
 */
router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(methodNotAllowed);

/**
 * @route ALL /movies/:movieId/critics
 * @description Return 404 for non-existent critics route
 */
router
  .route("/:movieId/critics")
  .all((_req, res) => {
    res.status(404).json({ error: "Route not found." });
  });

export default router;
