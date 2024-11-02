import { Express } from "express";
import { Knex } from "knex";

const { PORT = 5001 } = process.env;

// Import app and knex connection
const app: Express = require("./app");
const knex: Knex = require("./db/connection");

/**
 * Listener callback for when server starts
 */
const listener = (): void => console.log(`Listening on Port ${PORT}!`);

// Run latest migrations and start server
knex.migrate
  .latest()
  .then((migrations: string[]) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error: Error) => {
    console.error(error);
  });
