import User from "../models/User.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  res.status(StatusCodes.OK).json({ user: user.toJSON() });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "application stats" });
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, {
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "update user" });
};
