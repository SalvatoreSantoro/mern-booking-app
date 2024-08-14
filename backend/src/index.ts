import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import {errorHandler} from "./middlewares/errorHandler"

try {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
} catch (error) {
  console.log(error);
}


const port = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


// Error Handling
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});
