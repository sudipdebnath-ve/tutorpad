import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import { getInvoicePdf } from '../../services/invoiceService'
import axios from 'axios'

function FloatingMenus({onMouseLeave,id}) {
   const [invoice_link, set_invoice_link] = useState('')



  const viewPdf = async () => {
      const response = await getInvoicePdf(id);
      const pdf_url= response?.data.pdf_url;
      set_invoice_link(pdf_url);
  }

  const downloadPdf = async () => {
    try {
      const response = await axios.get(invoice_link,{
        responseType: "blob"
      });

      //create a blob from the response data
      const pdfBlob = new Blob([response.data],{type: 'application/pdf'});
      //create a temporary url for the blob
      const url = window.URL.createObjectURL(pdfBlob);

      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute("download", `invoice_${id}.pdf`);

      document.body.appendChild(tempLink);
      tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);


    } catch (error) {
      console.log("Error downloading pdf file: ",error);
    }
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
        <Link to={``} className="dropdown-item" >
        {" "}
        &nbsp;Void
        </Link>
        <Link className="dropdown-item" >
        {" "}
        &nbsp;Paid
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-plus" aria-hidden="true"></i>{" "}
        &nbsp;Add a Payment
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-archive" aria-hidden="true"></i>{" "}
        &nbsp;Archive
        </Link>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
        &nbsp;Delete
        </Link>
    </div>
    </>
  )
}

export default FloatingMenus
