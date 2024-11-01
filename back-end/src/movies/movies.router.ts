import { Router } from "express";
import controller from "./movies.controller";
import methodNotAllowed from "../errors/methodNotAllowed";

const router: Router = Router({ mergeParams: true });


router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);


router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);


router
  .route("/:movieId/theaters")
  .get(controller.readTheaters)
  .all(methodNotAllowed);


router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(methodNotAllowed);


router
  .route("/:movieId/critics")
  .all((_req, res) => {
    res.status(404).json({ error: "Route not found." });
  });

export default router;
