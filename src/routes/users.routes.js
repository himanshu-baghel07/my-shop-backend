import express from "express";
import {
  createUserController,
  getAllUserController,
  getUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUserController);

// GET single user
router.get("/:id", getUserController);

// POST create user
router.post("/", createUserController);

export default router;
