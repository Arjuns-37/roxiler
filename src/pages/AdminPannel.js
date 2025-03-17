import { useEffect, useState } from "react";
import { api } from "../services/api";

const AdminPannel = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await api.get("/admin/stats");
        const usersRes = await api.get("/admin/users");
        const storesRes = await api.get("/admin/stores");
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setStores(storesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Stores: {stats.totalStores}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email} ({user.role})</li>
        ))}
      </ul>
      <h3>Stores</h3>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.name} - {store.address} (Rating: {store.rating})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPannel;
