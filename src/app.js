if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Import routers
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware
app.use(cors());

// Routers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

module.exports = app;
