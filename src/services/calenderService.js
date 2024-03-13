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


export const updateTakeAttendanceEvents = async (data) => {
  return calenderApi.post('take-attendance',data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getParentDetailsList = async (name) => {
  return calenderApi.get('family-accounts/'+name).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

// let data = new FormData();
// data.append('student_ids', '[2]');
// data.append('occurrence_id', 'b3d9ba7b-d800-11ee-aa0b-029d5ef95414');
// data.append('attendance_status', '2');
// data.append('is_late', '0');
// data.append('given_notice', '0');
// data.append('give_makeup_credit', '0');
// data.append('lesson_is_billable', '1');
// data.append('lesson_price', '100');
// data.append('is_paid_at_lesson', '1');
// data.append('paid_amount', '40');
// data.append('used_makeup_credits', '0');
// data.append('lesson_details', 'test..');
// data.append('email_student', '0');
// data.append('email_tutor', '0');