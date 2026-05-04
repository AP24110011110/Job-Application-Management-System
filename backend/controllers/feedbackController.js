import Feedback from "../models/Feedback.js";

export async function createFeedback(req, res, next) {
  try {
    const feedback = await Feedback.create({ ...req.body, interviewer: req.user._id });
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
}

export async function getFeedback(req, res, next) {
  try {
    const feedback = await Feedback.find()
      .populate("candidate", "name stage score")
      .populate("interviewer", "name role")
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    next(error);
  }
}

export async function updateFeedback(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (error) {
    next(error);
  }
}

export async function deleteFeedback(req, res, next) {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    next(error);
  }
}
