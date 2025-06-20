import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://mern-stack-backend-hc8u.onrender.com" // Production URL
    : "http://localhost:5000", // Development URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
