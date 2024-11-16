import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Client-ID ${accessKey}`,
  },
});
