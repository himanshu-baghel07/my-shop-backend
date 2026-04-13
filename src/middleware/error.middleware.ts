import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    logger.warn(err.message);
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  const pgError = err as { code?: string };
  if (pgError.code === "23505") {
    logger.warn("Duplicate entry", { message: err.message });
    res
      .status(409)
      .json({ success: false, message: "Resource already exists" });
    return;
  }

  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ success: false, message: "Server Error" });
};
