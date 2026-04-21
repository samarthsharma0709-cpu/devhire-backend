import express from "express";
import { applyJob, getMyApplications } from "../controllers/applicationController.js";
import { auth } from "../middleware/auth.js";
import { getApplicantsForJob } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", auth, applyJob);
router.get("/me", auth, getMyApplications);
router.get("/job/:jobId", auth, getApplicantsForJob);

export default router;