import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.config.js";
import { AppError } from "../middleware/error.middleware.js";
import { LoginUserInput } from "../schema/auth.schema.js";

export const loginUserService = async (user: LoginUserInput) => {
  const { email, password } = user;

  if (!email || !password) {
    throw new AppError(400, "Email and Password both are required");
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    throw new AppError(404, "User not found");
  }

  const exisitingUser = result.rows[0];

  const isMatch = await bcrypt.compare(password, exisitingUser.password);

  if (!isMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: exisitingUser["userId"],
      email: exisitingUser.email,
      role: exisitingUser.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return { token };
};
