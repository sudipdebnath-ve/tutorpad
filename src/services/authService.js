import axios from "axios";
import { API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const authApi = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const verifyToken = async (data) => {
    return authApi.get().then((response) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
};