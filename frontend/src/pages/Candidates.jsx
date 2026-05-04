import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout.jsx";
import api from "../services/api.js";
import { dashboardData } from "../data.js";

export default function Candidates() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [message, setMessage] = useState("");

  const fetchApplications = () => {
    api
      .get("/applications")
      .then(({ data }) => setApplications(data))
      .catch(() => toast.info("Failed to fetch applications."));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await api.put(`/applications/${appId}`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchApplications();
      if (selectedApp && selectedApp._id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedApp) return;
    try {
      const updatedNotes = [...(selectedApp.notes || []), `Recruiter: ${message}`];
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
    <Layout
      title="Candidate tracking"
      subtitle="Search, shortlist, tag, and review candidates without extra clutter."
    >
      <article className="panel">
        <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Applicant list</h2>
          <input
            type="text"
            name="searchCandidates"
            id="searchCandidates"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="rec-bot-input"
          />
        </div>
        <div className="simple-list scrollable-container" style={{ maxHeight: "70vh" }}>
          {selectedApp ? (
            <div style={{ padding: "1rem" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button type="button" className="primary-button secondary" onClick={() => setSelectedApp(null)}>Back to List</button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" className="primary-button" onClick={() => handleUpdateStatus(selectedApp._id, 'Interview')}>Shortlist</button>
                  <button type="button" className="primary-button" style={{ background: 'var(--rose)' }} onClick={() => handleUpdateStatus(selectedApp._id, 'Rejected')}>Reject</button>
                  <button type="button" className="primary-button" style={{ background: 'var(--green)' }} onClick={() => handleUpdateStatus(selectedApp._id, 'Hired')}>Hire</button>
                </div>
              </div>
              <h3>Conversation with {selectedApp.candidateUser?.name || "Candidate"} for {selectedApp.job?.title}</h3>
              <div className="chat-container">
                {(selectedApp.notes || []).map((note, idx) => {
                  const isSentByMe = note.startsWith("Recruiter:");
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
            <div style={{ padding: "1rem" }}>No applications found.</div>
          ) : (
            (applications || []).filter(app => (app.candidateUser?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || (app.job?.title || "").toLowerCase().includes(searchQuery.toLowerCase())).map((app) => (
              <div className="simple-row" key={app._id}>
                <div>
                  <strong>{app.candidateUser?.name || "Unknown Candidate"}</strong>
                  <p>Applied for: {app.job?.title || "Unknown Job"}</p>
                  <p>Email: {app.candidateUser?.email}</p>
                </div>
                <div className="row-meta" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                  <span className="tag">{app.status}</span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="button" className="primary-button secondary" onClick={() => handleUpdateStatus(app._id, 'Interview')}>Shortlist</button>
                    <button type="button" className="primary-button" onClick={() => setSelectedApp(app)}>
                      Messages ({(app.notes || []).length})
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </Layout>
  );
}
