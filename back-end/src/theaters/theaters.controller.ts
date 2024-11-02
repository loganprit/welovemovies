import { Request, Response, NextFunction, RequestHandler } from "express";
import * as service from "./theaters.service";
import asyncErrorBoundary from "../errors/asyncErrorBoundary";
import type { TheaterWithMovies } from "../types/api";

async function listTheaters(
  _req: Request,
  res: Response<{ data: TheaterWithMovies[] }>,
  _next: NextFunction
): Promise<void> {
  const data = await service.list();
  res.json({ data });
}

export const list: RequestHandler = asyncErrorBoundary(listTheaters);
