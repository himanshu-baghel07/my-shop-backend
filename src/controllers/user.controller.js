import {
  createUserService,
  getAllUserService,
  getUserService,
} from "../services/user.service.js";
import logger from "../utils/logger.js";

export const getAllUserController = async (req, res) => {
  try {
    logger.info("GET /users - Fetching all users");
    const allUsers = await getAllUserService();

    logger.info(`Users fetched successfully. Count: ${allUsers.rowCount}`);

    res.json({
      status: "Success",
      data: allUsers.rows,
      totalCount: allUsers.rowCount,
    });
  } catch (error) {
    logger.error("Error fetching users", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Server error" });
  }
};
export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`GET /users/${id} - Fetching user by ID`);
    const user = await getUserService(id);

    if (user.rowCount === 0) {
      logger.warn(`User not found with ID: ${id}`);
      return res
        .status(404)
        .json({ status: "Not Found", message: "User not found" });
    }

    logger.info(`User fetched successfully. ID: ${id}`);
    res.json({
      status: "Success",
      data: user.rows,
      totalCount: user.rowCount,
    });
  } catch (error) {
    logger.error(`Error fetching user by ID`, {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Server error" });
  }
};

export const createUserController = async (req, res) => {
  try {
    logger.info("POST /users - Create user request received", {
      body: req.body,
    });

    const request = req.body;

    const newUser = await createUserService(request);
    const user = newUser.rows[0];

    const { password: _, ...safeUser } = user;

    logger.info("User created successfully", {
      userId: safeUser.userId,
      email: safeUser.email,
    });

    res.status(201).json({
      success: true,
      data: safeUser,
    });
  } catch (error) {
    // Duplicate email error (PostgreSQL)
    if (error.code === "23505") {
      logger.warn("User creation failed - Duplicate email", {
        email: req.body.email,
      });

      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Unexpected error
    logger.error("User creation failed - Server error", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
