import "express-async-errors";

import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});

  res.status(StatusCodes.OK).json({ jobs });
};

export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: `Deleted job with id: ${id}`, job });
};
