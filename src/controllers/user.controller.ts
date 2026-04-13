import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema.js";
import {
  createUserService,
  getAllUserService,
  getUserService,
} from "../services/user.service.js";
import logger from "../utils/logger.js";

export const getAllUserController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    logger.info("GET /users - Fetching all users");
    const allUsers = await getAllUserService();

    logger.info(`Users fetched successfully. Count: ${allUsers.rowCount}`);

    res.json({
      status: "Success",
      data: allUsers.rows,
      totalCount: allUsers.rowCount,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("Error fetching users", {
      message: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: "Server error" });
  }
};
export const getUserController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = _req.params as { id: string };

    logger.info(`GET /users/${id} - Fetching user by ID`);
    const user = await getUserService(id);

    if (user.rowCount === 0) {
      logger.warn(`User not found with ID: ${id}`);
      res.status(404).json({ status: "Not Found", message: "User not found" });
      return;
    }

    logger.info(`User fetched successfully. ID: ${id}`);
    res.json({
      status: "Success",
      data: user.rows,
      totalCount: user.rowCount,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(`Error fetching user by ID`, {
      message: err.message,
      stack: err.stack,
    });
    res.status(500).json({ error: "Server error" });
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    logger.info("POST /users - Create user request received", {
      body: req.body,
    });

    const { name, email, password, phone, role } = req.body as CreateUserInput;

    const newUser = await createUserService({
      name,
      email,
      password,
      phone,
      role,
    });
    const user = newUser.rows[0];

    const { password: _, ...safeUser } = user;

    logger.info("User created successfully", {
      userId: safeUser.userId,
      email: safeUser.email,
    });

    res.status(201).json({
      success: true,
      data: safeUser,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    const pgError = error as { code?: string };
    // Duplicate email error (PostgreSQL)
    if (pgError.code === "23505") {
      logger.warn("User creation failed - Duplicate email", {
        email: req.body.email,
      });

      res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }

    // Unexpected error
    logger.error("User creation failed - Server error", {
      message: err.message,
      stack: err.stack,
    });

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
