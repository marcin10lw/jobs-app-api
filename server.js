import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jobsRouter from "./routes/jobs.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

const port = process.env.PORT || 2137;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
