import mongoose from "mongoose";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Must provide company"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Must provide position"],
      trim: true,
    },
    jobLocation: {
      type: String,
      trim: true,
      default: "my city",
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
