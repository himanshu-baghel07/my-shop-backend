import { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/error.middleware.js";
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
  next: NextFunction,
): Promise<void> => {
  try {
    logger.info("GET /users - Fetching all users");
    const allUsers = await getAllUserService();
    logger.info(`Users fetched successfully. Count: ${allUsers.rowCount}`);
    res.json({
      status: "Success",
      data: allUsers.rows,
      totalCount: allUsers.rowCount ?? 0,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    logger.info(`GET /users/${id} - Fetching user by ID`);
    const user = await getUserService(id);

    if (user.rowCount === 0) {
      logger.warn(`User not found with ID: ${id}`);
      throw new AppError(404, "User not found");
    }

    logger.info(`User fetched successfully. ID: ${id}`);
    res.json({
      status: "Success",
      data: user.rows,
      totalCount: user.rowCount ?? 0,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

    res.status(201).json({ success: true, data: safeUser });
  } catch (error) {
    next(error);
  }
};
