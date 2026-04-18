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

    res.cookie("token", token, {
      httpOnly: false, // For Production true
      secure: true,
      sameSite: "lax", //For Production strict
      maxAge: 24 * 60 * 60 * 1000,
      // maxAge: 1 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // same as login (important!)
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
