import { Request, Response, NextFunction } from "express";
import * as service from "./movies.service";
import asyncErrorBoundary from "../errors/asyncErrorBoundary";
import type { Movie } from "../types/api";

interface CustomRequest extends Request {
  query: {
    is_showing?: string;
  };
  params: {
    movieId: string;
  };
}

interface CustomResponse extends Response {
  locals: {
    movie?: Movie;
  };
}

// Middleware to check if movie exists
async function movieExists(
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): Promise<void> {
  const movie = await service.read(Number(req.params.movieId));
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie with ID ${req.params.movieId} cannot be found.`,
  });
}

// Controller functions
async function list(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const isShowing = req.query.is_showing === "true";
  const data = await service.list(isShowing);
  res.json({ data });
}

async function read(
  _req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  if (res.locals.movie) {
    res.json({ data: res.locals.movie });
  }
}

async function readTheaters(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const data = await service.readTheaters(Number(req.params.movieId));
  res.json({ data });
}

async function readReviews(
  req: CustomRequest,
  res: CustomResponse,
  _next: NextFunction
): Promise<void> {
  const data = await service.readReviews(Number(req.params.movieId));
  res.json({ data });
}

export default {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
  readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)]
};
