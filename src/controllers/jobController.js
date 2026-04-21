import Job from "../models/Job.js";

// Create Job (admin)
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("createdBy", "name email");
  res.json(jobs);
};