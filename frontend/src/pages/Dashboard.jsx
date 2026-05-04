import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { dashboardData } from "../data.js";

function RecruiterDashboard() {
  const [metrics, setMetrics] = useState({
    activeJobs: 0,
    totalApps: 0,
    shortlisted: 0,
    rejected: 0
  });

  useEffect(() => {
    api.get("/analytics/overview")
      .then(({ data }) => setMetrics(data))
      .catch(() => toast.error("Failed to load metrics"));
  }, []);

  return (
    <>
      <article className="panel">
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Recruiting overview</h2>
          <Link to="/jobs" className="primary-button">Publish Opportunity</Link>
        </div>
        <div className="simple-metric-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div className="metric-card" style={{ borderLeft: '4px solid #facc15', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.25rem', color: '#3b82f6' }}>{metrics.activeJobs}</h3>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>ACTIVE JOBS</span>
            <p style={{ fontSize: '12px', margin: '0.5rem 0 0', color: '#22c55e' }}>↑ +2 this week</p>
          </div>
          <div className="metric-card" style={{ borderLeft: '4px solid #facc15', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.25rem', color: '#0f172a' }}>{metrics.totalApps}</h3>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>TOTAL APPS</span>
            <p style={{ fontSize: '12px', margin: '0.5rem 0 0', color: '#22c55e' }}>↑ +32 new</p>
          </div>
          <div className="metric-card" style={{ borderLeft: '4px solid #facc15', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.25rem', color: '#22c55e' }}>{metrics.shortlisted}</h3>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>SHORTLISTED</span>
            <p style={{ fontSize: '12px', margin: '0.5rem 0 0', color: '#22c55e' }}>↑ +5 today</p>
          </div>
          <div className="metric-card" style={{ borderLeft: '4px solid #facc15', padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.25rem', color: '#f43f5e' }}>{metrics.rejected}</h3>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>REJECTED</span>
            <p style={{ fontSize: '12px', margin: '0.5rem 0 0', color: '#22c55e' }}>↓ -10 this week</p>
          </div>
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Job and pipeline management</h2>
        </div>
        <div className="simple-list">
          {dashboardData.jobs.map((job) => (
            <div className="simple-row" key={job.id}>
              <div>
                <strong>{job.title}</strong>
                <p>{job.department} / {job.location}</p>
                <p>{job.openings} openings · Hiring manager: {job.hiringManager}</p>
              </div>
              <div className="row-meta">
                <span>{job.applicants} applicants</span>
                <span className="tag">{job.status}</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Communication and automation</h2>
        </div>
        <div className="simple-list">
          {dashboardData.notifications.map((item) => (
            <div className="simple-row" key={item}>
              <div>
                <strong>{item}</strong>
                <p>Email triggers, reminders, and duplicate checks are tracked here.</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

function HiringManagerDashboard() {
  return (
    <>
      <article className="panel">
        <div className="panel-header">
          <h2>Decision queue</h2>
        </div>
        <div className="simple-list">
          {dashboardData.managerQueue.map((item) => (
            <div className="simple-row" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Shortlisted candidates only</h2>
        </div>
        <div className="simple-list">
          {dashboardData.candidates
            .filter((candidate) => ["Screening", "Interview", "Offer"].includes(candidate.stage))
            .map((candidate) => (
              <div className="simple-row" key={candidate.id}>
                <div>
                  <strong>{candidate.name}</strong>
                  <p>{candidate.role} · {candidate.experience} · {candidate.location}</p>
                  <p>{candidate.note}</p>
                </div>
                <div className="row-meta">
                  <span>{candidate.score} score</span>
                  <span className="tag">{candidate.stage}</span>
                </div>
              </div>
            ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Interview participation</h2>
        </div>
        <div className="simple-list">
          {dashboardData.interviewSchedule.map((item) => (
            <div className="simple-row" key={item.id}>
              <div>
                <strong>{item.candidate}</strong>
                <p>{item.detail}</p>
              </div>
              <div className="row-meta">
                <span>{item.time}</span>
                <span className="tag">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [message, setMessage] = useState("");

  const fetchApplications = () => {
    api
      .get("/applications")
      .then(({ data }) => setApplications(data))
      .catch(() => toast.info("Failed to fetch your applications."));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedApp) return;
    try {
      const updatedNotes = [...(selectedApp.notes || []), `Candidate: ${message}`];
      await api.put(`/applications/${selectedApp._id}`, { notes: updatedNotes });
      toast.success("Message sent");
      setMessage("");
      fetchApplications();
      setSelectedApp({ ...selectedApp, notes: updatedNotes });
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      <article className="panel">
        <div className="panel-header">
          <h2>Your application tracking</h2>
        </div>
        <div className="simple-list">
          {selectedApp ? (
            <div style={{ padding: "1rem" }}>
              <button className="primary-button" onClick={() => setSelectedApp(null)} style={{ marginBottom: "1rem" }}>Back to List</button>
              <h3>Conversation for {selectedApp.job?.title}</h3>
              <div className="chat-container">
                {(selectedApp.notes || []).map((note, idx) => {
                  const isSentByMe = note.startsWith("Candidate:");
                  const sender = isSentByMe ? "You" : note.split(":")[0];
                  const text = note.substring(note.indexOf(":") + 1).trim();
                  return (
                    <div key={idx} className={`chat-bubble-wrapper ${isSentByMe ? "sent" : "received"}`}>
                      <span className="chat-sender">{sender}</span>
                      <div className="chat-bubble">{text}</div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={handleSendMessage} className="chat-input-wrapper">
                <input required value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." />
                <button type="submit" className="primary-button">Send</button>
              </form>
            </div>
          ) : applications.length === 0 ? (
            <div style={{ padding: "1rem" }}>You haven't applied to any jobs yet.</div>
          ) : (
            applications.map((app) => (
              <div className="simple-row" key={app._id}>
                <div>
                  <strong>{app.job?.title || "Unknown Job"}</strong>
                  <p>{app.job?.department} / {app.job?.location}</p>
                </div>
                <div className="row-meta" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                  <span className="tag">{app.status}</span>
                  <button className="primary-button" onClick={() => setSelectedApp(app)}>
                    Messages ({(app.notes || []).length})
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Recommended jobs</h2>
        </div>
        <div className="simple-list">
          {dashboardData.jobs.map((job) => (
            <div className="simple-row" key={job.id}>
              <div>
                <strong>{job.title}</strong>
                <p>{job.department} / {job.location}</p>
                <p>Skills: {job.skills.join(", ")}</p>
              </div>
              <div className="row-meta">
                <span>{job.applicants} applicants</span>
                <span className="tag">{job.status}</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Interview details</h2>
        </div>
        <div className="simple-list">
          <div className="simple-row">
            <div>
              <strong>Senior Frontend Engineer</strong>
              <p>Technical interview with live meeting link and reschedule option.</p>
            </div>
            <div className="row-meta">
              <span>Wednesday, 2:00 PM</span>
              <span className="tag">Scheduled</span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <article className="panel">
        <div className="panel-header">
          <h2>System overview</h2>
        </div>
        <div className="simple-metric-grid">
          <div className="simple-metric">
            <span>Users</span>
            <strong>124</strong>
            <p>Recruiters, managers, candidates, admins</p>
          </div>
          <div className="simple-metric">
            <span>Applications</span>
            <strong>412</strong>
            <p>Across all active roles</p>
          </div>
          <div className="simple-metric">
            <span>Notifications sent</span>
            <strong>86</strong>
            <p>Email and reminder activity</p>
          </div>
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Admin activity</h2>
        </div>
        <div className="simple-list">
          {dashboardData.notifications.map((item) => (
            <div className="simple-row" key={item}>
              <div>
                <strong>{item}</strong>
                <p>System-wide monitoring and audit visibility.</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

export default function Dashboard() {
  const { session } = useAuth();
  const role = session?.user?.role || "Candidate";

  const titleMap = {
    Recruiter: "Recruiter dashboard",
    "Hiring Manager": "Hiring manager dashboard",
    Candidate: "Candidate dashboard",
    Admin: "Admin dashboard",
  };

  const subtitleMap = {
    Recruiter: "Speed, automation, and visibility across hiring operations.",
    "Hiring Manager": "Shortlisted candidate review, interview feedback, and final decisions.",
    Candidate: "Simple application tracking, profile control, and interview clarity.",
    Admin: "Platform activity, role management, and operational visibility.",
  };

  return (
    <Layout title={titleMap[role] || "Dashboard"} subtitle={subtitleMap[role] || ""}>
      {role === "Recruiter" && <RecruiterDashboard />}
      {role === "Hiring Manager" && <HiringManagerDashboard />}
      {role === "Candidate" && <CandidateDashboard />}
      {role === "Admin" && <AdminDashboard />}
    </Layout>
  );
}
