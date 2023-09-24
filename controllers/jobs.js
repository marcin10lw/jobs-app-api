import { nanoid } from "nanoid";
import "express-async-errors";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end dev" },
  { id: nanoid(), company: "google", position: "back-end dev" },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    throw new Error("No job with that id");
    return res.status(404).json({ msg: `No job with id: ${id}` });
  }

  res.status(200).json({ job });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: "Must provide company and position" });
  }

  const newJob = { id: nanoid(), company, position };

  jobs = [...jobs, newJob];
  res.status(201).json({ job: newJob });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (!company && !position) {
    return res.status(400).json({ msg: `Must provide company or position` });
  }

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No jobs with id: ${id}` });
  }

  const updateJob = {
    ...job,
    company: company || job.company,
    position: position || job.position,
  };

  jobs = jobs.map((job) => {
    if (job.id === id) {
      return {
        ...job,
        ...updateJob,
      };
    }

    return job;
  });

  res.status(200).json({ job: updateJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `No jobs with id: ${id}` });
  }

  jobs = jobs.filter((job) => job.id !== id);

  res.status(200).json({ msg: `Deleted job with id: ${id}` });
};
