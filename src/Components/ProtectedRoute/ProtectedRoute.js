import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ allowedRole }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    if (user?.role === "Organizer") {
      return <Navigate to="/organizer-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;