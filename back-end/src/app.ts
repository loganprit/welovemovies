import { Express } from "express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load environment variables if USER is set
if (process.env.USER) {
  dotenv.config();
}

// Import routers
import moviesRouter from "./movies/movies.router";
import theatersRouter from "./theaters/theaters.router";
import reviewsRouter from "./reviews/reviews.router";

const app: Express = express();

// Read CORS origins from environment variable and split into an array
const corsOrigins: string[] = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

// Configure CORS middleware
app.use(
  cors({
    origin: corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

export default app;
