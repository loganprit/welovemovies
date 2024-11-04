import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/errors";

/**
 * Middleware to handle HTTP methods that aren't supported by a route
 */
export default function methodNotAllowed(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  next(
    new ApiError(
      405,
      `${req.method} not allowed for ${req.originalUrl}`
    )
  );
}
