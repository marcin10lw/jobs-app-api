import mongoose from "mongoose";

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
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", JobSchema);
export default Job;
