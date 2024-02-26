import axios from "axios";
import { API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const locationsApi = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAddressTypes = async () => {
    return locationsApi.get('latypes').then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};

export const createLocations = async (data) => {
    return locationsApi.post('create-eventloc',data).then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};
export const updateLocations = async (data,id) => {
    return locationsApi.patch('update-eventloc/'+id,data).then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};

export const deleteLocations = async (id) => {
  return locationsApi.delete('delete-eventloc/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getLocationsDetails = async (id) => {
    return locationsApi.get('eventloc/'+id).then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
};