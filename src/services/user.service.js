import { pool } from "../config/database.config.js";
import logger from "../utils/logger.js";

export const getAllUserService = async () => {
  logger.info("DB query - Fetching all users");
  const result = await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users`,
  );
  logger.info(`DB query complete - Fetched ${result.rowCount} users`);
  return result;
};

export const getUserService = async (id) => {
  logger.info(`DB query - Fetching user by ID: ${id}`);
  const result = await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users WHERE "userId" = $1`,
    [id],
  );
  return result;
};

export const createUserService = async (user) => {
  const { name, email, password, phone, role } = user;
  logger.info(`DB query - Inserting new user with email: ${email}`);
  const result = await pool.query(
    `INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING * `,
    [name, email, password, phone, role],
  );
  logger.info(
    `DB query complete - User inserted with ID: ${result.rows[0]?.userId}`,
  );
  return result;
};
