import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    yearsExperience: { type: Number, min: 0, default: 0 },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    resumeUrl: { type: String },
    tags: { type: [String], default: [] },
    notes: { type: [String], default: [] },
    parsedData: {
      skills: [String],
      education: String,
      experience: String,
      summary: String,
    },
    score: { type: Number, min: 0, max: 100, default: 0 },
    source: { type: String, default: "Careers page" },
    stage: {
      type: String,
      enum: ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
