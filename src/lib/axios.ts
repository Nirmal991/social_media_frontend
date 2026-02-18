import axios from 'axios';
import { backendUrl } from "../utils/constant";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// REQUEST interceptor FIRST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Interceptor token:", token);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE interceptor AFTER
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({
      status: error?.response?.status,
      message,
      error: error?.response?.data?.errors || [],
    });
  }
);

export default api;
