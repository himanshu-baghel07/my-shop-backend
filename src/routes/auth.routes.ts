import express from "express";

import {
  loginUserController,
  logoutController,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Login user
router.post("/login", loginUserController);

// Logout user
router.post("/logout", logoutController);

export default router;
