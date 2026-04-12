import { getAllUserServices } from "../services/user.service.js";

export const getAllUserController = async (req, res) => {
  try {
    const allUsers = await getAllUserServices();
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
