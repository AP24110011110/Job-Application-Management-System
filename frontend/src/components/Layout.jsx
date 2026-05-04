import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiBarChart2, FiBriefcase, FiCalendar, FiHome, FiLogOut, FiUsers } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

const roleNavMap = {
  Recruiter: [
    { label: "Dashboard", path: "/dashboard", icon: FiHome },
    { label: "Jobs", path: "/jobs", icon: FiBriefcase },
    { label: "Candidates", path: "/candidates", icon: FiUsers },
    { label: "Interviews", path: "/interviews", icon: FiCalendar },
    { label: "Reports", path: "/reports", icon: FiBarChart2 },
  ],
  "Hiring Manager": [
    { label: "Dashboard", path: "/dashboard", icon: FiHome },
    { label: "Jobs", path: "/jobs", icon: FiBriefcase },
    { label: "Candidates", path: "/candidates", icon: FiUsers },
    { label: "Interviews", path: "/interviews", icon: FiCalendar },
    { label: "Reports", path: "/reports", icon: FiBarChart2 },
  ],
  Candidate: [
    { label: "Dashboard", path: "/dashboard", icon: FiHome },
    { label: "Jobs", path: "/jobs", icon: FiBriefcase },
    { label: "Interviews", path: "/interviews", icon: FiCalendar },
  ],
  Admin: [
    { label: "Dashboard", path: "/dashboard", icon: FiHome },
    { label: "Jobs", path: "/jobs", icon: FiBriefcase },
    { label: "Candidates", path: "/candidates", icon: FiUsers },
    { label: "Interviews", path: "/interviews", icon: FiCalendar },
    { label: "Reports", path: "/reports", icon: FiBarChart2 },
  ],
};

export default function Layout({ title, subtitle, children }) {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const role = session?.user?.role || "Candidate";
  const navItems = roleNavMap[role] || roleNavMap.Candidate;

  useEffect(() => {
    const pageName = location.pathname.split("/")[1] || "dashboard";
    document.body.setAttribute("data-page", pageName);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-page">
      <header className="app-header">
        <div className="app-brand">
          <div className="app-brand-mark">J</div>
          <div>
            <strong>JAMS</strong>
            <span>{role}</span>
          </div>
        </div>

        <nav className="app-nav" aria-label="Main navigation">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} className={({ isActive }) => `app-nav-link${isActive ? " active" : ""}`}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button type="button" className="logout-button" onClick={handleLogout}>
          <FiLogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      <main className="app-main">
        <section className="page-heading">
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <div className="account-summary">
            <strong>{session?.user?.name}</strong>
            <span>{session?.user?.email}</span>
          </div>
        </section>

        <section className="page-stack">{children}</section>
      </main>
    </div>
  );
}
