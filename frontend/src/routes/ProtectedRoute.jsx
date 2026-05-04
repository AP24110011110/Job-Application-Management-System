import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { session } = useAuth();

  if (!session?.token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(session.user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children || <Outlet />;
}
