import Layout from "../components/Layout.jsx";
import { dashboardData } from "../data.js";

export default function Reports() {
  return (
    <Layout
      title="Reports and analytics"
      subtitle="Recruiter and manager reporting for applicants, conversions, and hiring speed."
    >
      <article className="panel">
        <div className="panel-header">
          <h2>Core metrics</h2>
        </div>
        <div className="simple-metric-grid">
          {dashboardData.metrics.map((item) => (
            <div className="simple-metric" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.trend}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Stage conversion</h2>
        </div>
        <div className="simple-list">
          {dashboardData.stages.map((stage) => (
            <div className="simple-row" key={stage.name}>
              <div>
                <strong>{stage.name}</strong>
                <p>Applicants currently in this stage.</p>
              </div>
              <div className="row-meta">
                <span>{stage.count} candidates</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <h2>Applications per job</h2>
          <p className="panel-description">Live demand snapshot for the company’s most active hiring tracks.</p>
        </div>
        <div className="simple-list">
          {dashboardData.jobs.map((job) => (
            <div className="simple-row" key={job.id}>
              <div>
                <strong>{job.title}</strong>
                <p>{job.applicants} applicants</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  );
}
