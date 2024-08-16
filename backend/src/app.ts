import express from "express";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error Handling
app.use(errorHandler);

export default app;
