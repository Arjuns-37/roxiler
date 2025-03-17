import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import AdminDashboard from "./pages/AdminDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stores" element={<Stores />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} 
          />

          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
          />

          <Route 
            path="/store-owner/dashboard" 
            element={<ProtectedRoute role="store_owner"><StoreOwnerDashboard /></ProtectedRoute>} 
          />

          {/* Default Fallback: Redirect based on authentication */}
          <Route 
            path="*" 
            element={<ProtectedRoute><Navigate to="/dashboard" /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
