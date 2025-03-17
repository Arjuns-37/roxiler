import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user", // Default role
  });

  
  

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const { name, email, address, password } = formData;
    if (name.length < 20 || name.length > 60) return "Name must be 20-60 characters long.";
    if (address.length > 400) return "Address must be under 400 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    if (!/(?=.*[A-Z])(?=.*[\W_]).{8,16}/.test(password))
      return "Password must be 8-16 characters long and include one uppercase letter and one special character.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
  
    // ✅ Debugging log to check the data before sending it
    console.log("🔍 Sending registration data:", formData);
  
    try {
      const response = await api.post("/auth/register", formData);
      console.log("✅ Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name (20-60 chars)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address (Max 400 chars)"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password (8-16 chars, 1 uppercase, 1 special)"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="user">Normal User</option>
          
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
