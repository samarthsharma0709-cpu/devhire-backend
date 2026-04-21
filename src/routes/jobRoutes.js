import express from "express";
import { createJob, deleteJob, getJobs } from "../controllers/jobController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// GET JOBS
router.get("/", auth, getJobs);

// CREATE JOB
router.post("/", auth, createJob);

// DELETE JOB
router.delete("/:id", auth, deleteJob);

export default router;