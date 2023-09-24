import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/api/v1/jobs", (req, res) => {
  res.send("Hello from Homepage");
});

app.post("/", (req, res) => {
  const body = req.body;

  res.status(200).json(body);
});

const port = process.env.PORT || 3000;

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
