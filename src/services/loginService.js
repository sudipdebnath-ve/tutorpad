import axios from "axios";
import { NON_LOGGED_IN_API_URL } from "../utils/config";
const loginApi = axios.create({
  baseURL: NON_LOGGED_IN_API_URL,
});



export const getDomainName = async  () =>{
    return loginApi.get('central-portal').then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
}

export const validateDomainName = async (data) => {
  return loginApi.post("validate-portal", data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return "An unknown error occurred.";
      }
    });
};


export const passwordSetupPortal = async (data) =>{
  return loginApi.post ("student/verify/password-setup-portal", data).then((response) =>{
    return response.data;

  })
  .catch((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return "An unknown error occurred.";
    }
  });
}


export const newPasswordSetup = async (data) =>{
  return loginApi.post ("student/setup-password", data).then((response) =>{
    return response.data;

  })
  .catch((error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return "An unknown error occurred.";
    }
  });
}
