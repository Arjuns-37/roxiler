import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const StoreDetails = () => {
  const { id } = useParams(); // Get store ID from URL
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(`/stores/${id}`);
        setStore(response.data);
      } catch (err) {
        setError("Failed to fetch store details");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [id]);

  if (loading) return <p>Loading store details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p><strong>Email:</strong> {store.email}</p>
      <p><strong>Address:</strong> {store.address}</p>
      <p><strong>Rating:</strong> {store.rating}</p>

      <h3>Reviews</h3>
      {store.ratings.length > 0 ? (
        <ul>
          {store.ratings.map((rating, index) => (
            <li key={index}>
              <p><strong>{rating.user}</strong> ({rating.email})</p>
              <p>Rating: {rating.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default StoreDetails;
