import User from "./models/User.js";
import Job from "./models/Job.js";
import mongoose from "mongoose";
import { readFile } from "fs/promises";
import { config } from "dotenv";
config();

const populate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");

    const user = await User.findOne({ email: "test2137@gmail.com" });

    const jsonJobs = JSON.parse(
      await readFile(new URL("./utils/mockData.json", import.meta.url))
    );

    const jobs = jsonJobs.map((job) => ({ ...job, createdBy: user._id }));
    await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs);

    console.log("successfully populated data");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
