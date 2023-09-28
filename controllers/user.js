import User from "../models/User.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  res.status(StatusCodes.OK).json({ user: user.toJSON() });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  console.log(req.file);
  const obj = { ...req.body };
  delete obj.password;
  delete obj.role;

  await User.findByIdAndUpdate(req.user.userId, obj, {
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "update user" });
};
