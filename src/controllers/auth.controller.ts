import { NextFunction, Request, Response } from "express";
import { loginUserService } from "../services/auth.service.js";
import logger from "../utils/logger.js";

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    logger.info("POST /login - Login user request received", {
      body: req.body,
    });

    if (!req.body || typeof req.body !== "object") {
      res.status(400).json({ success: false, message: "Invalid request body" });
      return;
    }
    const { email, password } = req.body;

    const { token } = await loginUserService({ email, password });

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
