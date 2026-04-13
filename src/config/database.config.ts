import dotenv from "dotenv";
import { Pool } from "pg";
import logger from "../utils/logger.js";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
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
