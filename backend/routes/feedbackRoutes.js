import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedback,
  updateFeedback,
} from "../controllers/feedbackController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getFeedback)
  .post(protect, authorize("Hiring Manager", "Recruiter", "Admin"), createFeedback);

router.route("/:id")
  .put(protect, authorize("Hiring Manager", "Recruiter", "Admin"), updateFeedback)
  .delete(protect, authorize("Admin", "Recruiter"), deleteFeedback);

export default router;
