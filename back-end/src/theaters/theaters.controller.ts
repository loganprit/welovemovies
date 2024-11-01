import { Request, Response, NextFunction } from "express";
import * as service from "./theaters.service";
import asyncErrorBoundary from "../errors/asyncErrorBoundary";
import type { TheaterWithMovies } from "../types/api";

/**
 * Lists all theaters with their associated movies
 */
async function listTheaters(
  _req: Request,
  res: Response<{ data: TheaterWithMovies[] }>,
  _next: NextFunction
): Promise<void> {
  const data = await service.list();
  res.json({ data });
}

export const list = asyncErrorBoundary(listTheaters);

export default { list };
