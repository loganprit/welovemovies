if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// Import routers
const moviesRouter = require("./routes/moviesRouter");
const theatersRouter = require("./routes/theatersRouter");
const reviewsRouter = require("./routes/reviewsRouter");

// Middleware to parse JSON bodies
app.use(express.json());

// Route handlers
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

module.exports = app;
