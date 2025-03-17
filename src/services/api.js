import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure this matches your backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
   // Needed for authentication if using cookies
});
