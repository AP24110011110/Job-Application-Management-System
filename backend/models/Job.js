import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, default: "Remote" },
    status: { type: String, enum: ["Draft", "Published", "Screening", "Interviewing", "Closed"], default: "Draft" },
    approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    stages: {
      type: [String],
      default: ["Applied", "Screening", "Interview", "Offer", "Hired"],
    },
    openings: { type: Number, min: 1, default: 1 },
    employmentType: { type: String, default: "Full-time" },
    skills: { type: [String], default: [] },
    company: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
