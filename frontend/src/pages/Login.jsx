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

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "Login failed"));
    }
  }

  return (
    <section className="auth-screen">
      <div className="auth-layout">
        <div className="auth-visual">
          <div className="auth-visual-copy">
            <div className="auth-mark">JAMS</div>
            <h1>Login to JAMS</h1>
            <p>Your role is already saved with your account. Sign in and we will open the right workspace for candidate, recruiter, or hiring manager.</p>
          </div>

          <div className="talent-scene" aria-hidden="true">
            <div className="scene-office">
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
              <strong>Welcome back</strong>
              <span>Use the same role you selected when you created your account.</span>
            </div>

            <div className="form-grid">
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

              <button className="primary-button wide" type="submit">
                Login
              </button>
            </div>

            <p className="auth-footnote">
              New user? <Link to="/register">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
