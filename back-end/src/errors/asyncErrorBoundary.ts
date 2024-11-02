import { Request, Response, NextFunction } from "express";

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

function asyncErrorBoundary<
  P = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, unknown>,
  Locals extends Record<string, unknown> = Record<string, unknown>
>(delegate: AsyncFunction<P, ResBody, ReqBody, ReqQuery, Locals>, defaultStatus = 500) {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): Promise<void> => {
    return Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch((error: unknown) => {
        const err = error as Error;
        next({
          status: defaultStatus,
          message: err?.message || "Internal server error",
        });
      });
  };
}

export default asyncErrorBoundary;
