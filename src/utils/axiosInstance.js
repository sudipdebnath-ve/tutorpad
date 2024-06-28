import { API_URL } from "./config";
import getToken from "./tokenUtils.Js";
import axios from "axios"

const createAxiosInstance = () => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.create({
      baseURL: API_URL,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
  };

export default createAxiosInstance;