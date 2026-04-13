import express from "express";
import {
  createUserController,
  getAllUserController,
  getUserController,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schema/user.schema.js";

const router = express.Router();

// GET all users
router.get("/", getAllUserController);

// GET single user
router.get("/:id", getUserController);

// POST create user
router.post("/", validate(createUserSchema), createUserController);

export default router;
