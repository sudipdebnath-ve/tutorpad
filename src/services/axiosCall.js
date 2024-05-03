import axios from "axios";
import { API_URL } from "../utils/config";

const token = JSON.parse(localStorage.getItem("tutorPad"));

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
    
  },
  withCredentials: true,
});

const userApi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function post(url, data) {
  return axiosApi.post(url, data);
}

export async function get(url) {
  return userApi.get(url);
}
