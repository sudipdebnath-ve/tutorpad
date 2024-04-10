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

export const disableAutoInvoicesTransaction= async (id, data) => {
  return invoicesApi.patch('disable-auto-invoicing/'+id, data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updatePaidStatus = async (data,id) => {
  return invoicesApi.patch('invoice-paid/'+id,data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateArchiveStatus = async (data,id) => {
  return invoicesApi.patch('invoice-archive/'+id,data).then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateVoidStatus = async (data,id) => {
  return invoicesApi.patch('invoice-void/'+id,data).then((response) => {
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

export const enableAutoInoviceById = async ( data,id ) =>{
  return invoicesApi.post('configure-auto-invoicing/'+id, data).then ((response)=>{
        return response.data;
  })
  .catch((error) => {
     console.log(error);
   });
}

export const getInvoicePdf = async (id) => {
    return invoicesApi.get('invoice-pdf/'+id).then((response) => {
      return response.data;
    })
    .catch((err)=>{
      console.log(err);
    })
}

export const getDownloadPdf = async (id) => {
  return invoicesApi.get('download-invoice-pdf/'+id,{
    responseType: "blob"
  }).then((response) => {
    return response.data;
  })
  .catch((err)=>{
    console.log(err);
  })
}

export const deleteInvoiceById = async (id) => {
  return invoicesApi.delete('delete-invoice/'+id).then((response) => {
    return response.data;
  })
  .catch((err)=>{
    console.log(err);
  })
}
