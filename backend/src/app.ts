import express from "express";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// Common middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL as string,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.static(path.join(__dirname, "../../frontend/dist")));


// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error Handling
app.use(errorHandler);

export default app;
