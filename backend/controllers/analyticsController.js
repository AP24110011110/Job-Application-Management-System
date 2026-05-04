import Application from "../models/Application.js";
import Job from "../models/Job.js";

export async function getOverview(req, res, next) {
  try {
    const [activeJobs, totalApps, shortlisted, rejected] = await Promise.all([
      Job.countDocuments({ status: { $ne: "Closed" } }),
      Application.countDocuments(),
      Application.countDocuments({ status: { $in: ["Screening", "Interview", "Offer"] } }),
      Application.countDocuments({ status: "Rejected" })
    ]);

    res.json({
      activeJobs,
      totalApps,
      shortlisted,
      rejected
    });
  } catch (error) {
    next(error);
  }
}
