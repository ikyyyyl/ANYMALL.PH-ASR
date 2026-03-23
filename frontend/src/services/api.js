import axios from "axios";

const API = axios.create({
  baseURL: "https://anymall-ph-asr-backend.onrender.com/api",
});

export default API;