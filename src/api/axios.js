import axios from "axios";

const API = axios.create({
  baseURL: "flight-production-119d.up.railway.app",  
});

API.interceptors.request.use((req) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
