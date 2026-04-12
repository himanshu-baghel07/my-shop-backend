import { pool } from "../config/database.config.js";

export const getAllUserServices = async () => {
  return await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users`,
  );
};
