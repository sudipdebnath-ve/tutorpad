import axios from "axios";
import { API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const invoicesApi = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getFamilyAccounts= async () => {
    return invoicesApi.get('family-accounts').then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
};
