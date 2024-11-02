import { Router } from "express";
import controller from "./reviews.controller";
import methodNotAllowed from "../errors/methodNotAllowed";

const router: Router = Router({ mergeParams: true });

router.route("/").all(methodNotAllowed);

router
  .route("/:reviewId")
  .get(controller.reviewExists, controller.read)
  .put(controller.reviewExists, controller.update)
  .delete(controller.reviewExists, controller.destroy)
  .all(methodNotAllowed);

export default router;
