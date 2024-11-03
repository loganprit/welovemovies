import knex from "knex";
import config from "../knexfile";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

if (!environmentConfig) {
  throw new Error(`No configuration found for environment: ${environment}`);
}

const connection = knex(environmentConfig);

export default connection;