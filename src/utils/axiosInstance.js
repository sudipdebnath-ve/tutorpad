import axios from "axios";
import { getToken } from "./tokenUtils"
import { API_URL } from "./config";

export const createAxiosInstance = () =>{
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}`} :{ }; 
    return axios.create({
        baseURL : API_URL,
        headers : {
           ...headers,
            'Content-Type' : 'application/json'
        }
    })
}