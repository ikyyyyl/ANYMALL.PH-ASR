import axios from "axios";

const API = axios.create({
  // baseURL: "https://anymall-ph-asr-backend.onrender.com/api",
  baseURL: "https://192.168.31.147:5000/api",
});

export default API;