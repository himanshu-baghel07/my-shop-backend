import * as bcrypt from "bcrypt";
import { pool } from "../config/database.config.js";
import logger from "../utils/logger.js";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export const getAllUserService = async () => {
  logger.info("DB query - Fetching all users");
  const result = await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users`,
  );
  logger.info(`DB query complete - Fetched ${result.rowCount} users`);
  return result;
};

export const getUserService = async (id: string) => {
  logger.info(`DB query - Fetching user by ID: ${id}`);
  const result = await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users WHERE "userId" = $1`,
    [id],
  );
  return result;
};

export const createUserService = async (user: CreateUserInput) => {
  const { name, email, password, phone, role } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  logger.info(`DB query - Inserting new user with email: ${email}`);
  const result = await pool.query(
    `INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING * `,
    [name, email, hashedPassword, phone, role],
  );
  logger.info(
    `DB query complete - User inserted with ID: ${result.rows[0]?.userId}`,
  );
  return result;
};
