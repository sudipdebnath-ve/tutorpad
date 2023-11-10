import axios from "axios";
import { API_URL } from "../utils/config";

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function post(url, data) {
  return axiosApi.post(url, data);
}
