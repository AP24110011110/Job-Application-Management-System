import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

function getAuthErrorMessage(error, fallback) {
  if (!error.response) {
    return "Cannot reach the server. Start the backend on port 5001 and try again.";
  }

  if (Array.isArray(error.response.data?.errors) && error.response.data.errors.length > 0) {
    return error.response.data.errors[0].message;
  }

  return error.response.data?.message || fallback;
}

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Candidate" });
  const { register } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "Registration failed"));
    }
  }

  return (
    <section className="auth-screen">
      <div className="auth-layout">
        <div className="auth-visual">
          <div className="auth-visual-copy">
            <div className="auth-mark">JAMS</div>
            <h1>Create your account</h1>
            <p>Choose your role once during registration. After that, login will automatically open the right workspace.</p>
          </div>

          <div className="talent-scene" aria-hidden="true">
            <div className="scene-office register-scene">
              <div className="scene-window" />
              <div className="scene-desk" />
              <div className="scene-company-card recruiter-card">
                <strong>Recruiter</strong>
                <span>Create jobs</span>
              </div>
              <div className="scene-company-card manager-card">
                <strong>Manager</strong>
                <span>Hire the candidate</span>
              </div>
              <div className="scene-company-card candidate-card">
                <strong>Candidate</strong>
                <span>Looks for opportunity</span>
              </div>
              <div className="character recruiter">
                <span className="head" />
                <span className="body" />
                <span className="laptop" />
              </div>
              <div className="character manager">
                <span className="head" />
                <span className="body" />
                <span className="tablet" />
              </div>
              <div className="character candidate">
                <span className="head" />
                <span className="body" />
                <span className="folder" />
              </div>
            </div>
          </div>
        </div>

        <div className="auth-shell">
          <form className="auth-card" onSubmit={submit}>
            <div className="auth-card-head">
              <strong>Register</strong>
              <span>Keep it simple. Create the account, choose the role, and continue.</span>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>Full name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Role</span>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option>Candidate</option>
                  <option>Recruiter</option>
                  <option>Hiring Manager</option>
                </select>
              </label>

              <button className="primary-button wide" type="submit">
                Create account
              </button>
            </div>

            <p className="auth-footnote">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
