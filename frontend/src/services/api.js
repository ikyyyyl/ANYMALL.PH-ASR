import axios from "axios";

const API = axios.create({
  baseURL: "https://anymall-ph-asr-frontend.onrender.com/api",
});

export default API;
