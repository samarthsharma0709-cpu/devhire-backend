import express from "express";
import { applyJob, getMyApplications } from "../controllers/applicationController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, applyJob);
router.get("/me", auth, getMyApplications);

export default router;