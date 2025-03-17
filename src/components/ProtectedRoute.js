import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Role-based redirection
  if (role && user.role !== role) {
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user.role === "store_owner") return <Navigate to="/store-owner/dashboard" />; // Fixed role name
    return <Navigate to="/dashboard" />; // Normal users
  }

  return children;
};

export default ProtectedRoute;
