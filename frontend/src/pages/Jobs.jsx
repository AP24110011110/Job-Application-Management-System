import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { dashboardData } from "../data.js";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", description: "", department: "", location: "" });
  const { session } = useAuth();
  const role = session?.user?.role || "Candidate";

  const fetchJobs = () => {
    api
      .get("/jobs")
      .then(({ data }) => setJobs(data))
      .catch(() => toast.info("Showing demo jobs until the backend is running."));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", newJob);
      toast.success("Job created successfully!");
      setShowCreateForm(false);
      setNewJob({ title: "", description: "", department: "", location: "" });
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create job");
    }
  };

  const handleApply = async (jobId) => {
    try {
      await api.post("/applications", { job: jobId });
      toast.success("Applied successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <Layout
      title={role === "Candidate" ? "Job search" : "Job management"}
      subtitle={
        role === "Candidate"
          ? "Search and review open roles with a simple application path."
          : "Create roles, manage approvals, and track hiring stages."
      }
    >
      <article className="panel">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{role === "Candidate" ? "Open jobs" : "All job postings"}</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              name="searchJobs"
              id="searchJobs"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rec-bot-input"
            />
            {role !== "Candidate" && (
              <button className="primary-button" onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Cancel" : "Publish Job"}
              </button>
            )}
          </div>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateJob} className="rec-form" style={{ padding: "1rem", borderBottom: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label className="rec-field">
              <span>Title</span>
              <input required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
            </label>
            <label className="rec-field">
              <span>Description</span>
              <textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} />
            </label>
            <label className="rec-field">
              <span>Department</span>
              <input required value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} />
            </label>
            <label className="rec-field">
              <span>Location</span>
              <input required value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
            </label>
            <button type="submit" className="primary-button" style={{ alignSelf: "flex-start" }}>Submit</button>
          </form>
        )}
        
        <div className="simple-list scrollable-container" style={{ maxHeight: "60vh" }}>
          {(jobs || []).filter(job => (job.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || (job.department || "").toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
            <div className="simple-row" key={job._id || job.id || job.title}>
              <div>
                <strong>{job.title}</strong>
                <p>{job.department} / {job.location}</p>
                <p>
                  {(job.skills || []).length ? `Skills: ${job.skills.join(", ")}` : "Skills not added yet"}
                </p>
                {role !== "Candidate" ? (
                  <p>
                    Approval: {job.approvalStatus || "Pending"} · Stages: {(job.stages || []).join(" -> ")}
                  </p>
                ) : null}
              </div>
              <div className="row-meta" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span>{job.applicants || 0} applicants</span>
                  <span className="tag">{job.status}</span>
                </div>
                {role === "Candidate" && (
                  <button className="primary-button" onClick={() => handleApply(job._id || job.id)}>
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
}
