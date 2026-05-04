import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    verdict: { type: String, enum: ["Strong hire", "Move forward", "Hold", "Reject"], required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
