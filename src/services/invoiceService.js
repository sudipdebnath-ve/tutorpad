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

export const createInvoice= async (data) => {
  return invoicesApi.post('create-invoice',data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFamilyAccountsDetails= async (id) => {
  return invoicesApi.get('family-account/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saveTransaction= async (data) => {
  return invoicesApi.post('create-transaction',data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const updateTransaction= async (data,id) => {
  return invoicesApi.patch('update-transaction/'+id,data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTransactionById = async (id) => {
  return invoicesApi.get('transaction/'+id).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getInvoicePdf = async (id) => {
    return invoicesApi.get('invoice-pdf/'+id).then((response) => {
      return response.data;
    })
    .catch((err)=>{
      console.log(err);
    })
}
