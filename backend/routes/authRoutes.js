import express from "express";
import { body } from "express-validator";
import { login, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role")
      .isIn(["Recruiter", "Hiring Manager", "Candidate"])
      .withMessage("Valid role is required"),
  ],
  register
);

router.post("/login", login);
router.get("/me", protect, me);

export default router;
