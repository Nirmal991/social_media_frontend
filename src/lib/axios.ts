import axios from 'axios';
import { backendUrl } from "../utils/constant";

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        Accept: "application/json"
    }
});

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
  },
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;

