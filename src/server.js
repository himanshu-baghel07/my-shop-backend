import dotenv from "dotenv";
import app from "./app.js";

// app.post("/users", async (req, res) => {
//   try {
//     const { name, email, password, phone, role } = req.body;

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = await pool.query(
//       "INSERT INTO users (name,email,password,phone,role)   VALUES ($1, $2, $3, $4, $5) RETURNING*",
//       [name, email, hashedPassword, phone, role],
//     );

//     const user = newUser.rows[0];

//     const { password: _, ...safeUser } = user;

//     res.status(201).json(safeUser);
//   } catch (error) {
//     if (error.code === "23505") {
//       return res
//         .status(409)
//         .json({ message: "User already exists with this email" });
//     }
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

try {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}
