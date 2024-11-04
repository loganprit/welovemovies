import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApiError, ErrorResponse } from "./types/errors";

// Load environment variables if USER is set
if (process.env.USER) {
  dotenv.config();
}

// Import routers
import moviesRouter from "./movies/movies.router";
import theatersRouter from "./theaters/theaters.router";
import reviewsRouter from "./reviews/reviews.router";

/**
 * Global error handler middleware
 */
const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
      statusCode: err.statusCode,
    });
  } else {
    // Handle unexpected errors
    res.status(500).json({
      error: "Internal server error",
      statusCode: 500,
    });
  }
};

/**
 * Configure and create Express application with type-safe middleware
 */
const configureApp = (): Express => {
  const app: Express = express();

  // Read and validate CORS origins from environment variable
  const corsOrigins: string[] = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : [];

  if (corsOrigins.length === 0) {
    console.warn("No CORS origins specified. API will not accept cross-origin requests.");
  }

  // Configure CORS middleware with strict typing
  app.use(
    cors({
      origin: corsOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
      maxAge: 86400, // 24 hours
    })
  );

  // Middleware to parse JSON bodies with size limit
  app.use(express.json({ limit: "10mb" }));

  // Mount routers
  app.use("/movies", moviesRouter);
  app.use("/theaters", theatersRouter);
  app.use("/reviews", reviewsRouter);

  // Error handling middleware
  app.use(errorHandler);

  return app;
};

// Create and export the configured Express application
export default configureApp();
