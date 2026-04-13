import { Pool } from "pg";
import logger from "../utils/logger.js";

export const pool = new Pool({
  user: "postgres",
  password: "Complejo95@",
  host: "localhost",
  port: 5432,
  database: "myshop",
});

pool.on("connect", () => {
  logger.info("Database connection established");
});

pool.on("error", (err) => {
  logger.error("Unexpected database error", {
    message: err.message,
    stack: err.stack,
  });
});
