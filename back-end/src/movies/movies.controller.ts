import { Request, Response, NextFunction } from "express";
import * as service from "./movies.service";
import asyncErrorBoundary from "../errors/asyncErrorBoundary";
import type { Movie } from "../types/api";

/**
 * Extended Request interface for movie-specific routes
 */
interface CustomRequest extends Request {
  query: {
    is_showing?: string;
  };
  params: {
    movieId: string;
  };
}

/**
 * Extended Response interface with movie-specific locals
 */
interface CustomResponse extends Response {
  locals: {
    movie?: Movie;
  };
}

/**
 * Validates movie existence and attaches to response locals
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
async function movieExists(
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): Promise<void> {
  const movieId = Number(req.params.movieId);
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  res.status(404).json({
    error: `Movie with ID ${req.params.movieId} cannot be found.`
  });
}

/**
 * Lists all movies, optionally filtered by showing status
 * @param req - Express request object
 * @param res - Express response object
 */
async function list(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const isShowing = req.query.is_showing === "true";
  const data = await service.list(isShowing);
  res.json({ data });
}

/**
 * Retrieves a specific movie by ID
 * @param _req - Express request object
 * @param res - Express response object
 */
async function read(
  _req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  res.json({ data: res.locals.movie });
}

/**
 * Lists theaters showing a specific movie
 * @param req - Express request object
 * @param res - Express response object
 */
async function readTheaters(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const movieId = Number(req.params.movieId);
  const data = await service.readTheaters(movieId);
  res.json({ data });
}

/**
 * Lists reviews for a specific movie
 * @param req - Express request object
 * @param res - Express response object
 */
async function readReviews(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const movieId = Number(req.params.movieId);
  const data = await service.readReviews(movieId);
  res.json({ data });
}

export default {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)]
};
