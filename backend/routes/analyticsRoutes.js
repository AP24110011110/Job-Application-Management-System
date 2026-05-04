import express from "express";
import { getOverview } from "../controllers/analyticsController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", protect, authorize("Recruiter", "Hiring Manager", "Admin"), getOverview);

export default router;
