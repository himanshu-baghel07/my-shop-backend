import cors from "cors";
import express, { Application } from "express";
import userRoutes from "./routes/users.routes.js";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

export default app;
