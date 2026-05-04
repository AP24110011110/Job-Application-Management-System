import express from "express";
import {
  createApplication,
  getApplication,
  getApplications,
  updateApplication,
} from "../controllers/applicationController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("Recruiter", "Hiring Manager", "Candidate", "Admin"), getApplications)
  .post(protect, authorize("Recruiter", "Candidate", "Admin"), createApplication);

router
  .route("/:id")
  .get(protect, authorize("Recruiter", "Hiring Manager", "Candidate", "Admin"), getApplication)
  .put(protect, authorize("Recruiter", "Hiring Manager", "Candidate", "Admin"), updateApplication);

export default router;
