import Job from "../models/Job.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { title, description, company } = req.body;

    // basic validation
    if (!title || !description || !company) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const job = await Job.create({
      title,
      description,
      company,
      createdBy: req.user.id, // 👈 from auth middleware
    });

    res.json(job);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};  
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    await job.deleteOne();

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};