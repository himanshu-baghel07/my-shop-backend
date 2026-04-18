import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "./error.middleware.js";

export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const user = req.user;

  if (!user || typeof user === "string") {
    next(new AppError(401, "Unauthorized"));
    return;
  }

  const { role } = user as JwtPayload & { role: string };

  if (role !== "admin") {
    next(new AppError(403, "Access denied. Admin only."));
    return;
  }

  next();
};
