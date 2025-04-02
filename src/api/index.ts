import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BASE_URL;

const tmdbApi = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
  headers: {
    accept: "application/json",
  },
});

export default tmdbApi;
