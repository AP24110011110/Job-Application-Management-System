import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Jobs from "./pages/Jobs.jsx";
import Candidates from "./pages/Candidates.jsx";
import Interviews from "./pages/Interviews.jsx";
import Reports from "./pages/Reports.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "react-toastify/dist/ReactToastify.css";

function PublicOnly({ children }) {
  const { session } = useAuth();
  return session?.token ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnly>
                <Login />
              </PublicOnly>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnly>
                <Register />
              </PublicOnly>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route
              path="/candidates"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Hiring Manager", "Admin"]}>
                  <Candidates />
                </ProtectedRoute>
              }
            />
            <Route path="/interviews" element={<Interviews />} />
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Hiring Manager", "Admin"]}>
                  <Reports />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
      </BrowserRouter>
    </AuthProvider>
  );
}
