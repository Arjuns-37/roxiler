import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change this if backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allows cookies if using authentication
});

export default API;
