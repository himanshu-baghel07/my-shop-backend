import { pool } from "../config/database.config.js";

export const getAllUserService = async () => {
  return await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users`,
  );
};
export const getUserService = async (id) => {
  return await pool.query(
    `SELECT "userId", name, email, phone, role,  "createdAt"
         FROM users WHERE "userId" = $1`,
    [id],
  );
};

export const createUserService = async (user) => {
  const { name, email, password, phone, role } = user;

  return await pool.query(
    `INSERT INTO users (name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING * `,
    [name, email, password, phone, role],
  );
};
