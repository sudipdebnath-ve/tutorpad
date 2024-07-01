

import { createAxiosInstance } from "../utils/axiosInstance";

// const token = JSON.parse(localStorage.getItem("tutorPad"));
// console.log("token from invoice service--------------------", token);
// const invoicesApi = axios.create({
//     baseURL: API_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

const invoicesApi = createAxiosInstance()

export const getFamilyAccounts= async () => {
  // var localToken1 = JSON.parse(localStorage.getItem("tutorPad"));
  // var _token = token ? token : localToken1
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

export const getFamilyAccountsDetails= async (id,token) => {
  // var localToken = JSON.parse(localStorage.getItem("tutorPad"));
  // token = token ? token : localToken;
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
      return error;
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
    console.log("response from transactionById------------->",response.data);
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

export const getIncomingInvoice = async (id, token) => {
  return invoicesApi.get('upcoming-latest-invoice/'+id).then((response) => {
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

export const getInvoiceById = async (id) => {
  return invoicesApi.get('invoice/'+id,{
  }).then((response) => {
    return response.data;
  })
  .catch((err)=>{
    console.log(err);
  })
}

export const sendEmail = async ( data,id ) =>{
  return invoicesApi.post('email-invoice/'+id, data).then ((response)=>{
        return response.data;
  })
  .catch((error) => {
     console.log(error);
   });
}


export const getAllInvoiceByDate = async (date_from,date_to) => {
  return invoicesApi.get(`invoices?date_from=${date_from}&date_to=${date_to}`,{
  }).then((response) => {
    return response.data;
  })
  .catch((err)=>{
    console.log(err);
  })
}

export const deleteTransactionById = async (id ) =>{
  return invoicesApi.delete('delete-transaction/'+id).then((response) =>{
    return response.data;
  })
  .catch((error) => {
    return error
  });
}

export const getPrepaidBalance = async() =>{
  return invoicesApi.get('prepaid-balance').then ((response)=>{
    console.log("prepaid-balance-------------", response);
    return response.data;
  })
  .catch((error) => {
     console.log(error);
     return error;
   });
}

 export const getOwedBalance = async () =>{
  return invoicesApi.get('owed-balance').then ((response)=>{
    return response.data;
  })
  .catch((error) => {
     return error;
   });
 }        

 

/*

import { createAxiosInstance } from "../utils/axiosInstance";

const invoicesApi = createAxiosInstance();

export const getFamilyAccounts = async () => {
  try {
    const response = await invoicesApi.get('family-accounts');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createInvoice = async (data) => {
  try {
    const response = await invoicesApi.post('create-invoice', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFamilyAccountsDetails = async (id) => {
  try {
    const response = await invoicesApi.get(`family-account/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveTransaction = async (data) => {
  try {
    const response = await invoicesApi.post('create-transaction', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTransaction = async (data, id) => {
  try {
    const response = await invoicesApi.patch(`update-transaction/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const disableAutoInvoicesTransaction = async (id, data) => {
  try {
    const response = await invoicesApi.patch(`disable-auto-invoicing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePaidStatus = async (data, id) => {
  try {
    const response = await invoicesApi.patch(`invoice-paid/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateArchiveStatus = async (data, id) => {
  try {
    const response = await invoicesApi.patch(`invoice-archive/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateVoidStatus = async (data, id) => {
  try {
    const response = await invoicesApi.patch(`invoice-void/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTransactionById = async (id) => {
  try {
    const response = await invoicesApi.get(`transaction/${id}`);
    console.log("response from transactionById------------->", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const enableAutoInoviceById = async (data, id) => {
  try {
    const response = await invoicesApi.post(`configure-auto-invoicing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInvoicePdf = async (id) => {
  try {
    const response = await invoicesApi.get(`invoice-pdf/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIncomingInvoice = async (id) => {
  try {
    const response = await invoicesApi.get(`upcoming-latest-invoice/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDownloadPdf = async (id) => {
  try {
    const response = await invoicesApi.get(`download-invoice-pdf/${id}`, {
      responseType: "blob"
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteInvoiceById = async (id) => {
  try {
    const response = await invoicesApi.delete(`delete-invoice/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await invoicesApi.get(`invoice/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendEmail = async (data, id) => {
  try {
    const response = await invoicesApi.post(`email-invoice/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllInvoiceByDate = async (date_from, date_to) => {
  try {
    const response = await invoicesApi.get(`invoices?date_from=${date_from}&date_to=${date_to}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTransactionById = async (id) => {
  try {
    const response = await invoicesApi.delete(`delete-transaction/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPrepaidBalance = async () => {
  try {
    const response = await invoicesApi.get('prepaid-balance');
    console.log("prepaid-balance-------------", response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOwedBalance = async () => {
  try {
    const response = await invoicesApi.get('owed-balance');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 

*/
