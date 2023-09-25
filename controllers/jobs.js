import "express-async-errors";

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const { userId } = req.user;
  const jobs = await Job.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ jobs });
};

export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  const job = await Job.findOne({ _id: id, createdBy: userId });

  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const job = await Job.findOneAndDelete({ _id: id, createdBy: userId });

  res.status(StatusCodes.OK).json({ msg: `Deleted job with id: ${id}`, job });
};
