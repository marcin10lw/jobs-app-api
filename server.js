import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jobsRouter from "./routes/jobs.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authMiddleware } from "./middleware/auth.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://marcin10lw.github.io"
        : "http://localhost:5173",
    credentials: true,
  })
);

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);
app.use("/api/v1/users", authMiddleware, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 2137;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
