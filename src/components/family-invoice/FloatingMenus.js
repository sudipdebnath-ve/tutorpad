import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getInvoicePdf,
  updatePaidStatus,
  updateArchiveStatus,
  updateVoidStatus,
  getDownloadPdf,
  deleteInvoiceById,
} from "../../services/invoiceService";
import ReactModal from "react-modal"; // Import your modal library here

function FloatingMenus({
  onMouseLeave,
  id,
  is_paid,
  set_is_paid,
  is_archived,
  set_is_archived,
  is_void,
  set_is_void,
  set_is_deleted,
}) {
  const [invoice_link, set_invoice_link] = useState("");
  const [showVoidModal, setShowVoidModal] = useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  const customStyles = {
    content: {
      width: "35%",
      minHeight: "35%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "#6c5a5669",
      zIndex: 9999, // Ensure the modal overlay has a higher z-index
    },
  };

  const viewPdf = async () => {
    const response = await getInvoicePdf(id);
    const pdf_url = response?.data.pdf_url;
    set_invoice_link(pdf_url);
  };

  const downloadPdf = async () => {
    try {
      const pdfData = await getDownloadPdf(id);
      const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", `invoice_${id}.pdf`);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading PDF:", error);
    }
  };

  const togglePaidStatus = async () => {
    const newPaidStatus = is_paid == "1" ? "0" : "1";
    const newVoidStatus =
      is_void == "1" && newPaidStatus == "1" ? "0" : is_void;
    const data = {
      paid: newPaidStatus,
      void: newVoidStatus,
    };
    try {
      const response = await updatePaidStatus(data, id);
      if (response.success) {
        // Update the is_paid state by calling the set_is_paid function
        // Update the is_paid and is_void states
        set_is_paid(newPaidStatus);
        set_is_void(newVoidStatus == "0" ? "0" : newVoidStatus);
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.log("Error toggling paid status: ", error);
    }
  };

  const toggleArchivedStatus = async () => {
    const data = {
      archive: is_archived == "1" ? "0" : "1",
    };
    try {
      const response = await updateArchiveStatus(data, id);
      if (response.success) {
        // Update the is_paid state by calling the set_is_paid function
        set_is_archived((prevState) => (prevState == "1" ? "0" : "1"));
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.log("Error toggling archive status: ", error);
    }
  };

  const toggleVoidStatus = async () => {
    const newVoidStatus = is_void == "1" ? "0" : "1";
    const newPaidStatus =
      is_paid == "1" && newVoidStatus == "1" ? "0" : is_paid;
    const data = {
      paid: newPaidStatus,
      void: newVoidStatus,
    };
    try {
      const response = await updateVoidStatus(data, id);
      if (response.success) {
        // Update the is_paid state by calling the set_is_paid function
        set_is_void(newVoidStatus);
        set_is_paid(newPaidStatus == "0" ? "0" : newPaidStatus);
        setShowVoidModal(false)
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      console.log("Error toggling void status: ", error);
    }
  };

  const deleteInvoice = async () => {
    try {
      const response = await deleteInvoiceById(id);
      if (response.success === true) {
        set_is_deleted(true);
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log("Error deleting the invoice: ", error);
    }
  };

  useEffect(() => {
    viewPdf();
  }, [id]);

  return (
    <>
      <div
        onMouseLeave={showVoidModal ? null : onMouseLeave}
        className="dropdown-menu dropdown-menu-end show"
        style={{ position: "absolute", right: 80, top: 0, zIndex: 99999999 }}
      >
        <Link className="dropdown-item" to={invoice_link} target="_blank">
          <i className="fa fa-eye" aria-hidden="true"></i> &nbsp; View
        </Link>
        <Link className="dropdown-item">
          <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp;Email
        </Link>
        <button className="dropdown-item" onClick={downloadPdf}>
          <i className="fa fa-download" aria-hidden="true"></i> &nbsp;Download
          PDF
        </button>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item"> &nbsp;Override Status</button>
        <button
          to={``}
          className="dropdown-item"
          style={{
            background: "#ffe4d7",
            color: "#b71c37",
            marginBottom: "2px",
          }}
          onClick={() => setShowVoidModal(true)}
        >
          {" "}
          &nbsp;Void
        </button>
        <button
          className="dropdown-item"
          onClick={togglePaidStatus}
          style={{ background: "#eafcd2", color: "#18790b" }}
        >
          {" "}
          &nbsp;Paid
        </button>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item">
          <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;Add a Payment
        </Link>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item" onClick={toggleArchivedStatus}>
          <i className="fa fa-archive" aria-hidden="true"></i> &nbsp;
          {is_archived == "0" ? "Archive" : "Unarchive"}
        </button>
        <button className="dropdown-item" onClick={deleteInvoice}>
          <i className="fa fa-trash" aria-hidden="true"></i> &nbsp;Delete
        </button>
      </div>
      {/* Modal for void confirmation */}
      <ReactModal
        isOpen={showVoidModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setShowVoidModal(false)}
        style={customStyles}
        contentLabel="Void Invoice Modal"
      >
        <div className="calendar-modal">
          <div
            className="close-h"
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <button
              className="closeModal"
              style={{
                backgroundColor: "transparent",
                fontSize: "25px",
                color: "red",
              }}
              onClick={()=>setShowVoidModal(false)}
            >
              X
            </button>
          </div>
          <div className="calendar-date-time">
            <h3 className="fw-bold">Void Invoice</h3>
            <div className="formbold-input-flex">
              <p>
                Are you sure you want to void this invoice? You'll still be able
                to view, email, and download it from the list of invoices, but
                payments added to the Family Account will not mark this invoice
                as paid.
              </p>
            </div>
            <div className="formbold-form-btn-wrapper">
              <div className="btn-end">
                <button
                  onClick={() => setShowVoidModal(false)}
                  className="cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => toggleVoidStatus()}
                  className="formbold-btn"
                >
                  Void Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

export default FloatingMenus;
