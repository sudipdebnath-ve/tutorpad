import axios from "axios";
import { API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const categoriesApi = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  
export const getPayrollOverideTypes = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}potypes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(validateconfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const createCategories = async (data) => {
    return categoriesApi.post('create-eventcat',data).then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};
export const updateCategories = async (data,id) => {
    return categoriesApi.patch('update-eventcat/'+id,data).then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
};

export const deleteCategories = async (id) => {
  return categoriesApi.delete('delete-eventcat/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getCategories = async () => {
    return categoriesApi.get('eventcats').then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
};
export const getCategoriesDetails = async (id) => {
    return categoriesApi.get('eventcat/'+id).then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
};


export const createChargeCategories = async (data) => {
  return categoriesApi.post('create-chargecat',data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const updateChargeCategories = async (data,id) => {
  return categoriesApi.patch('update-chargecat/'+id,data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const deleteChargeCategories = async (id) => {
  return categoriesApi.delete('delete-chargecat/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};