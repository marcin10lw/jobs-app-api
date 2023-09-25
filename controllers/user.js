import User from "../models/User.js";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get current user" });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "application stats" });
};

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
