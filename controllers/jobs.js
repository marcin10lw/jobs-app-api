import "express-async-errors";
import dayjs from "dayjs";

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

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

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  let defaultStats = {
    pending: 0,
    interview: 0,
    declined: 0,
  };

  stats.forEach(({ _id, count }) => {
    defaultStats[_id] = count;
  });

  let monthlyApplications = [
    {
      date: "May 23",
      count: 12,
    },
    {
      date: "Jun 23",
      count: 12,
    },
    {
      date: "Jul 23",
      count: 12,
    },
  ];

  res.status(StatusCodes.OK).json({ stats: defaultStats, monthlyApplications });
};
