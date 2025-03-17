import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import '../style.css'; 
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      console.log("Login successful:", response.data);

      const { user, token } = response.data;
      if (!user || !user.role) {
       
        throw new Error("Invalid user data received.");
    }

    console.log("Login successful:", user);


      // Store user details and token in context & local storage
     
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Token Expiration Management
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const tokenExpiry = tokenPayload.exp * 1000;

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login"); // Redirect to login when expired
      }, tokenExpiry - Date.now());

      // Redirect logic
      if (user.role === "user") {
        navigate("/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "store_owner") {
        navigate("/store-owner");
      } else {
        navigate("/"); // Fallback route
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
