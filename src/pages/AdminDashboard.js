import { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", address: "", role: "user" });
  const [error, setError] = useState(null);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await api.get("/admin/stats"); // Get total counts
        const usersRes = await api.get("/admin/users"); // Get users list
        const storesRes = await api.get("/admin/stores"); // Get stores list
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setStores(storesRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to load admin dashboard.");
      }
    };
    fetchDashboardData();
  }, []);

  // Handle New User Submission
  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log("Submitting New User:", newUser); // ✅ Debugging log
  
    try {
      await api.post("/admin/users", newUser);
      alert("User added successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error adding user:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add user.");
    }
  };
  

  // Handle Filtering
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.address.toLowerCase().includes(filters.address.toLowerCase()) &&
    (filters.role === "" || user.role === filters.role)
  );

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Dashboard Statistics */}
      <div>
        <h3>Dashboard Stats</h3>
        <p>Total Users: {stats.users}</p>
        <p>Total Stores: {stats.stores}</p>
        <p>Total Ratings: {stats.ratings}</p>
      </div>

      {/* Add New User */}
      <div>
        <h3>Add New User</h3>
        <form onSubmit={handleAddUser}>
          <input type="text" placeholder="Name" required onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input type="email" placeholder="Email" required onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <input type="password" placeholder="Password" required onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <input type="text" placeholder="Address" required onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
          <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button type="submit">Add User</button>
        </form>
      </div>

      {/* Users List */}
      <div>
        <h3>Users List</h3>
        <input type="text" placeholder="Search by Name" onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
        <input type="text" placeholder="Search by Email" onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
        <input type="text" placeholder="Search by Address" onChange={(e) => setFilters({ ...filters, address: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>

        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.address} - {user.role}
            </li>
          ))}
        </ul>
      </div>

      {/* Stores List */}
      <div>
        <h3>Stores List</h3>
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              {store.name} - {store.email} - {store.address} - Rating: {store.rating}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <button onClick={() => navigate("/login")}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
