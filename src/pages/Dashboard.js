import { useEffect, useState } from "react";
import { api } from "../services/api";

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get("/stores");
        setStores(response.data);
      } catch (err) {
        console.error("Error fetching stores:", err);
      }
    };
    fetchStores();
  }, []);

  const handleRating = async (storeId, rating) => {
    try {
      await api.post(`/stores/${storeId}/rate`, { rating });
      setRatings({ ...ratings, [storeId]: rating });
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  return (
    <div className="container">
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} - {store.address} (Avg. Rating: {store.rating})
            <select
              value={ratings[store.id] || ""}
              onChange={(e) => handleRating(store.id, e.target.value)}
            >
              <option value="">Rate</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
