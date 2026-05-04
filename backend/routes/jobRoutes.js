import express from "express";
import { createJob, deleteJob, getJob, getJobs, updateJob } from "../controllers/jobController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getJobs)
  .post(protect, authorize("Recruiter", "Hiring Manager", "Admin"), createJob);

router.route("/:id")
  .get(protect, getJob)
  .put(protect, authorize("Recruiter", "Hiring Manager", "Admin"), updateJob)
  .delete(protect, authorize("Recruiter", "Hiring Manager", "Admin"), deleteJob);

export default router;
