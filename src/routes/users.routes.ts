import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserController,
} from "../controllers/user.controller.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schema/user.schema.js";

const router = express.Router();

// GET all users
router.get("/", authMiddleware, getAllUserController);

// GET single user
router.get("/:id", authMiddleware, getUserController);

// POST create user
router.post("/", validate(createUserSchema), createUserController);

router.delete("/:id", authMiddleware, adminMiddleware, deleteUserController);

export default router;
