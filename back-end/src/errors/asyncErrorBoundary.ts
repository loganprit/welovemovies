import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/errors";

type AsyncFunction<
  P = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, unknown>,
  Locals extends Record<string, unknown> = Record<string, unknown>
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => Promise<void>;

export default function asyncErrorBoundary<
  P = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, unknown>,
  Locals extends Record<string, unknown> = Record<string, unknown>
>(delegate: AsyncFunction<P, ResBody, ReqBody, ReqQuery, Locals>) {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): Promise<void> => {
    return Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch((error: unknown) => {
        if (error instanceof ApiError) {
          next(error);
        } else {
          next(new ApiError(500, "Internal server error"));
        }
      });
  };
}
