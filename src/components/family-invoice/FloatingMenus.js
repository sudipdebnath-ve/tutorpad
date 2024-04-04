import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import { getInvoicePdf, updatePaidStatus, updateArchiveStatus, updateVoidStatus } from '../../services/invoiceService'
import axios from 'axios'

function FloatingMenus({onMouseLeave,
  id,
  is_paid, 
  set_is_paid,
  is_archived, 
  set_is_archived,
  is_void,
  set_is_void,  
}) {
   const [invoice_link, set_invoice_link] = useState('')


  const viewPdf = async () => {
      const response = await getInvoicePdf(id);
      const pdf_url= response?.data.pdf_url;
      set_invoice_link(pdf_url);
  }

  const downloadPdf = async () => {

    // const pdfUrl = invoice_link;
    // const link = document.createElement("a");
    // link.href = pdfUrl;
    // link.download = "document.pdf"; // specify the filename
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    try {
      const response = await axios.get(invoice_link,{
        responseType: "blob"
      });

      //create a blob from the response data
      const pdfBlob = new Blob([response.data],{type: 'application/pdf'});
      //create a temporary url for the blob
      const url = window.URL.createObjectURL(pdfBlob);

      const tempLink = document.createElement('a');
      tempLink.href = invoice_link;
      tempLink.setAttribute("download", "invoice.pdf");

      document.body.appendChild(tempLink);
      console.log(tempLink);
    //  tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);


    } catch (error) {
      console.log("Error downloading pdf file: ",error);
    }
  }

  const togglePaidStatus = async () => {
    const newPaidStatus = is_paid == '1' ? '0' : '1';
    const newVoidStatus = is_void == '1' && newPaidStatus == '1' ? '0' : is_void;
    const data = {
      paid: newPaidStatus,
      void: newVoidStatus
    };
    try {
      const response = await updatePaidStatus(data, id);
      if (response.success) {
        // Update the is_paid state by calling the set_is_paid function
        // Update the is_paid and is_void states
      set_is_paid(newPaidStatus);
      set_is_void(newVoidStatus == '0' ? '0' : newVoidStatus);
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.log("Error toggling paid status: ", error);
    }
  };

  const toggleArchivedStatus = async () => {
    const data = {
      archive: is_archived == '1' ? '0' : '1'
    };
    try {
      const response = await updateArchiveStatus(data, id);
      if (response.success) {
        // Update the is_paid state by calling the set_is_paid function
        set_is_archived(prevState => prevState == '1' ? '0' : '1');
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.log("Error toggling archive status: ", error);
    }
  };

  const toggleVoidStatus = async () => {
    const newVoidStatus = is_void == '1' ? '0' : '1';
    const newPaidStatus = is_paid == '1' && newVoidStatus == '1' ? '0' : is_paid;
    const data = {
      paid: newPaidStatus,
      void: newVoidStatus
    };
    try {
      const response = await updateVoidStatus(data, id);
      if (response.success) {
        // Update the is_paid state by calling the set_is_paid function
        set_is_void(newVoidStatus);
        set_is_paid(newPaidStatus == '0' ? '0' : newPaidStatus);
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.log("Error toggling void status: ", error);
    }
  }

  const deleteInvoice = async () => {

  }
  

  useEffect(()=>{
    viewPdf();
  },[id])

  return (
    <>
    <div onMouseLeave={onMouseLeave} className="dropdown-menu dropdown-menu-end show"
    style={{ position: 'absolute', right: 80,top:0,zIndex:99999999 }}>
        <Link className="dropdown-item"
        to={invoice_link} target='_blank'>
        <i className="fa fa-eye" aria-hidden="true"></i> &nbsp; View
        </Link>
        <Link className="dropdown-item">
        <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
        &nbsp;Email
        </Link>
        <button className="dropdown-item" onClick={downloadPdf}>
        <i className="fa fa-download" aria-hidden="true"></i>{" "}
        &nbsp;Download PDF
        </button>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item" >
        {" "}
        &nbsp;Override Status
        </button>
        <button to={``} className="dropdown-item"
        style={{background: '#ffe4d7', color:'#b71c37',marginBottom:'2px'}}
        onClick={toggleVoidStatus} >
        {" "}
        &nbsp;Void
        </button>
        <button className="dropdown-item" onClick={togglePaidStatus}
        style={{background: '#eafcd2', color:'#18790b'}} >
        {" "}
        &nbsp;Paid
        </button>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item">
        <i className="fa fa-plus" aria-hidden="true"></i>{" "}
        &nbsp;Add a Payment
        </Link>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item"
        onClick={toggleArchivedStatus}>
        <i className="fa fa-archive" aria-hidden="true"></i>{" "}
        &nbsp;{is_archived == '0' ? 'Archive' : 'Unarchive'}
        </button>
        <button className="dropdown-item"
        onClick={deleteInvoice}>
        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
        &nbsp;Delete
        </button>
    </div>
    </>
  )
}

export default FloatingMenus
