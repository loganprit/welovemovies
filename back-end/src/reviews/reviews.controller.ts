import { Request, Response, NextFunction } from "express";
import * as service from "./reviews.service";
import type { Review } from "../types/api";

interface ReviewParams {
  reviewId: string;
}

interface ReviewBody {
  data: {
    content?: string;
    score?: number;
  };
}

interface ReviewLocals {
  review: Review;
}

type CustomRequest = Request<ReviewParams, unknown, ReviewBody>;
type CustomResponse = Response<unknown, ReviewLocals>;

/**
 * Middleware to validate review existence
 */
async function reviewExists(
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): Promise<void> {
  const reviewId = Number(req.params.reviewId);
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }

  res.status(404).json({
    error: `Review with ID ${req.params.reviewId} cannot be found.`
  });
}

/**
 * Retrieves a specific review by ID
 */
async function read(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const data = await service.read(Number(req.params.reviewId));
  res.json({ data });
}

/**
 * Updates an existing review
 */
async function update(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  
  await service.update(updatedReview);
  const updated = await service.readWithCritic(res.locals.review.review_id);
  res.json({ data: updated[0] });
}

/**
 * Deletes an existing review
 */
async function destroy(
  _req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

export default {
  read,
  update,
  destroy,
  reviewExists,
};
