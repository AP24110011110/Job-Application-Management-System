import Interview from "../models/Interview.js";

export async function createInterview(req, res, next) {
  try {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error) {
    next(error);
  }
}

export async function getInterviews(req, res, next) {
  try {
    const interviews = await Interview.find()
      .populate("candidate", "name email stage")
      .populate("job", "title")
      .populate("panel", "name role")
      .sort({ scheduledAt: 1 });
    res.json(interviews);
  } catch (error) {
    next(error);
  }
}

export async function updateInterview(req, res, next) {
  try {
    const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    res.json(interview);
  } catch (error) {
    next(error);
  }
}

export async function deleteInterview(req, res, next) {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    res.json({ message: "Interview deleted" });
  } catch (error) {
    next(error);
  }
}
