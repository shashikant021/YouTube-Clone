import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://youtube-clone-870d.onrender.com/api",
});

export default api;
