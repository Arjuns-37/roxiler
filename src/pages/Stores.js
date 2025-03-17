import { useState, useEffect } from "react";
import { api } from "../services/api";

const Stores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/stores").then((response) => setStores(response.data));
  }, []);

  return (
    <div className="container">
      <h2>Stores</h2>
      <div className="store-list">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>Rating: {store.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
