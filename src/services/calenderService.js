import axios from "axios";
import { API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const calenderApi = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createEvents = async (data) => {
    return calenderApi.post('create-event',data).then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};

export const updateEvents = async (data,id) => {
  return calenderApi.patch('update-event/'+id,data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const cloneEvents = async (data) => {
  return calenderApi.post('clone-event',data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteEvents = async (data,id) => {
  return calenderApi.patch('delete-event/'+id,data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};


export const getStudentsByTutorId = async (id) => {
  return calenderApi.get('assigned-students/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getEventDetailsById = async (id) => {
  return calenderApi.get('event/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};


export const getAttendanceTypes = async () => {
  return calenderApi.get('astypes').then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};