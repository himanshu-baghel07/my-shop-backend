import { NextFunction, Request, Response } from "express";
import { getProductsService } from "../services/product.service.js";
import logger from "../utils/logger.js";

export const getProductsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("GET /api/products - Fetching all products");
    const data = await getProductsService();
    logger.info(`GET /api/products - Returned ${data.length} products`);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error(`GET /api/products - Error: ${(error as Error).message}`);
    next(error);
  }
};
