import { useEffect, useState } from "react";
import { api } from "../services/api";

const StoreOwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await api.get("/store-owner/ratings");
        setRatings(response.data.ratings);
        setAverageRating(response.data.averageRating);
      } catch (err) {
        console.error("Error fetching ratings:", err);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="container">
      <h2>Store Owner Dashboard</h2>
      <p>Average Store Rating: {averageRating}</p>
      <h3>Customer Ratings</h3>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>{rating.user}: {rating.score} stars</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreOwnerDashboard;
