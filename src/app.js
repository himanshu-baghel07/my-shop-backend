import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

export default app;
