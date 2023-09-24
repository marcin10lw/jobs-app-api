import "express-async-errors";

import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});

  res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    throw new Error(`No job with id: ${id}`);
  }

  res.status(200).json({ job });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: "Must provide company and position" });
  }

  const job = await Job.create(req.body);

  res.status(201).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return res.status(404).json({ msg: `No jobs with id: ${id}` });
  }

  res.status(200).json({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    return res.status(404).json({ msg: `No jobs with id: ${id}` });
  }

  res.status(200).json({ msg: `Deleted job with id: ${id}` });
};
