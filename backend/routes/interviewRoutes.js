import express from "express";
import {
  createInterview,
  deleteInterview,
  getInterviews,
  updateInterview,
} from "../controllers/interviewController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getInterviews)
  .post(protect, authorize("Recruiter", "Admin"), createInterview);

router.route("/:id")
  .put(protect, authorize("Recruiter", "Admin"), updateInterview)
  .delete(protect, authorize("Recruiter", "Admin"), deleteInterview);

export default router;
