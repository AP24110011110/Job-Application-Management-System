import Job from "../models/Job.js";

export async function createJob(req, res, next) {
  try {
    const job = await Job.create({ ...req.body, owner: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
}

export async function getJobs(req, res, next) {
  try {
    const jobs = await Job.find().populate("owner", "name email role").sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
}

export async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id).populate("owner", "name email role");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    next(error);
  }
}

export async function updateJob(req, res, next) {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    next(error);
  }
}

export async function deleteJob(req, res, next) {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
}
