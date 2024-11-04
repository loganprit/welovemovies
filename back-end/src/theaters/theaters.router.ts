import { Router } from "express";
import controller from "./theaters.controller";
import methodNotAllowed from "../errors/methodNotAllowed";

const router: Router = Router({ mergeParams: true });

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

export default router;
