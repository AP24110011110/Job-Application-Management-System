import Candidate from "../models/Candidate.js";

function parseResumeMock(body) {
  const skills = body.skills || ["React", "Node.js", "MongoDB"];
  return {
    skills,
    education: body.education || "Not provided",
    experience: body.experience || "Not provided",
    summary: body.summary || "Candidate profile generated from resume data.",
  };
}

export async function createCandidate(req, res, next) {
  try {
    const existingCandidate = await Candidate.findOne({ email: req.body.email?.toLowerCase() });
    if (existingCandidate) {
      return res.status(409).json({ message: "Candidate profile already exists for this email" });
    }

    const parsedData = req.body.parsedData || parseResumeMock(req.body);
    const candidate = await Candidate.create({ ...req.body, parsedData });
    res.status(201).json(candidate);
  } catch (error) {
    next(error);
  }
}

export async function getCandidates(req, res, next) {
  try {
    const query = req.query.stage ? { stage: req.query.stage } : {};
    const candidates = await Candidate.find(query).populate("job", "title department").sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    next(error);
  }
}

export async function getCandidate(req, res, next) {
  try {
    const candidate = await Candidate.findById(req.params.id).populate("job", "title department");
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    next(error);
  }
}

export async function updateCandidate(req, res, next) {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    next(error);
  }
}

export async function deleteCandidate(req, res, next) {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json({ message: "Candidate deleted" });
  } catch (error) {
    next(error);
  }
}
