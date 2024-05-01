import axios from "axios";
import { NON_LOGGED_IN_API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const loginApi = axios.create({
    baseURL: NON_LOGGED_IN_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const getdomain = async  () =>{
    return loginApi.get('central-portal').then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
}

export const validateDomain = async ( data ) =>{
    return loginApi.post('validate-portal',data).then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
}
