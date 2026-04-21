import Application from "../models/Application.js";
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    console.log("User:", req.user.id);
    console.log("Job:", jobId);

    const existing = await Application.findOne({
      user: req.user.id,
      job: jobId
    });

    if (existing) {
      return res.status(400).json({ msg: "Already applied" });
    }

    const application = await Application.create({
      user: req.user.id,
      job: jobId
    });

    res.json(application);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
export const getMyApplications = async (req, res) => {
  const apps = await Application.find({ user: req.user.id })
    .populate("job");

  res.json(apps);
};
export const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate("createdBy");

if (job.createdBy._id.toString() !== req.user.id) {
  return res.status(403).json({ msg: "Not allowed" });
}

    const apps = await Application.find({ job: req.params.jobId })
      .populate("user", "name email");

    res.json(apps);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};