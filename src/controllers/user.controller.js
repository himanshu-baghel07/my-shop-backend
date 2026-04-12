import {
  createUserService,
  getAllUserService,
  getUserService,
} from "../services/user.service.js";

export const getAllUserController = async (req, res) => {
  try {
    const allUsers = await getAllUserService();
    res.json({
      status: "Success",
      data: allUsers.rows,
      totalCount: allUsers.rowCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserService(id);
    res.json({
      status: "Success",
      data: user.rows,
      totalCount: user.rowCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createUserController = async (req, res) => {
  try {
    const request = req.body;
    const newUser = await createUserService(request);
    const user = newUser.rows[0];
    const { password: _, ...safeUser } = user;

    res.status(201).json({
      success: true,
      data: safeUser,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
