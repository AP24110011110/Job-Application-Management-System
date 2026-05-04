import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { dashboardData } from "../data.js";

export default function Interviews() {
  const { session } = useAuth();
  const role = session?.user?.role || "Candidate";

  const candidateView = [
    {
      id: "candidate-int-1",
      candidate: "Senior Frontend Engineer",
      detail: "Online interview link, preparation notes, and reschedule option available.",
      time: "Wednesday, 2:00 PM",
      status: "Scheduled",
    },
  ];

  const items = role === "Candidate" ? candidateView : dashboardData.interviewSchedule;

  return (
    <Layout
      title="Interview scheduling"
      subtitle={
        role === "Candidate"
          ? "Clear interview details, reminders, and updates."
          : "Schedule interviews, avoid conflicts, and keep reminders visible."
      }
    >
      <article className="panel">
        <div className="panel-header">
          <h2>{role === "Candidate" ? "Upcoming interview" : "Interview calendar"}</h2>
        </div>
        <div className="simple-list">
          {items.map((item) => (
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
    </Layout>
  );
}
