import express from "express";
import { getProductsController } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProductsController);

export default router;
