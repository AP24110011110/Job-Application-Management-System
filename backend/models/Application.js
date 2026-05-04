import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    candidateUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    candidateProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected", "Withdrawn"],
      default: "Applied",
    },
    source: { type: String, default: "Careers page" },
    resumeUrl: { type: String },
    coverLetter: { type: String },
    notes: { type: [String], default: [] },
    recruiterTags: { type: [String], default: [] },
    lastActivityAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

applicationSchema.index({ candidateUser: 1, job: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);
