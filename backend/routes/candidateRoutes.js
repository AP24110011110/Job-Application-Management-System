import express from "express";
import {
  createCandidate,
  deleteCandidate,
  getCandidate,
  getCandidates,
  updateCandidate,
} from "../controllers/candidateController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getCandidates)
  .post(protect, authorize("Recruiter", "Candidate", "Admin"), createCandidate);

router.route("/:id")
  .get(protect, getCandidate)
  .put(protect, authorize("Recruiter", "Hiring Manager", "Admin"), updateCandidate)
  .delete(protect, authorize("Recruiter", "Admin"), deleteCandidate);

export default router;
