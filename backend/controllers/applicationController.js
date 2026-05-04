import Application from "../models/Application.js";

export async function createApplication(req, res, next) {
  try {
    const payload = {
      ...req.body,
      candidateUser: req.user.role === "Candidate" ? req.user._id : req.body.candidateUser,
      lastActivityAt: new Date(),
    };

    const application = await Application.create(payload);
    res.status(201).json(application);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Application already exists for this candidate and job" });
    }
    next(error);
  }
}

export async function getApplications(req, res, next) {
  try {
    const query = {};

    if (req.user.role === "Candidate") {
      query.candidateUser = req.user._id;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.job) {
      query.job = req.query.job;
    }

    const applications = await Application.find(query)
      .populate("candidateUser", "name email role")
      .populate("candidateProfile", "name email parsedData score")
      .populate("job", "title department location status")
      .sort({ updatedAt: -1 });

    res.json(applications);
  } catch (error) {
    next(error);
  }
}

export async function getApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id)
      .populate("candidateUser", "name email role")
      .populate("candidateProfile", "name email parsedData score")
      .populate("job", "title department location status");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (
      req.user.role === "Candidate" &&
      String(application.candidateUser?._id || application.candidateUser) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Forbidden for this role" });
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
}

export async function updateApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.user.role === "Candidate" && String(application.candidateUser) !== String(req.user._id)) {
      return res.status(403).json({ message: "Forbidden for this role" });
    }

    Object.assign(application, req.body, { lastActivityAt: new Date() });
    await application.save();

    res.json(application);
  } catch (error) {
    next(error);
  }
}
