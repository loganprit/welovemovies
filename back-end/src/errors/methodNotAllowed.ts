import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle HTTP methods that aren't supported by a route
 */
function methodNotAllowed(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

export default methodNotAllowed;
