import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    scheduledAt: { type: Date, required: true },
    type: { type: String, default: "Technical round" },
    panel: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["Scheduled", "Confirmed", "Completed", "Cancelled"], default: "Scheduled" },
    calendarProvider: { type: String, enum: ["Manual", "Google", "Outlook"], default: "Manual" },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);
