import mongoose from "mongoose";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "company is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "position is required"],
      trim: true,
    },
    jobLocation: {
      type: String,
      trim: true,
      required: [true, "job location is required"],
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: "pending",
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
  },
  {
    strictQuery: true,
    timestamps: true,
  }
);

const Job = mongoose.model("job", JobSchema);
export default Job;
