import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import "../users/assets/css/customDatepicker.css";
import "./style.css";
import TransactionType from "./TransactionType.js";
import PaymentRefundForm from "./PaymentRefundForm.js";
import { useParams, useNavigate } from "react-router-dom";
import ChargesDiscountForm from "./ChargesDiscountForm.js";
import InvoiceForm from "./InvoiceForm.js";

const AddInvoiceDetail = () => {
  const param = useParams();
  const { sidebarToggle } = useUserDataContext();
  return (
    <div className="wrapper">
      {sidebarToggle ? (
        <>
          <MiniSidebar />
        </>
      ) : (
        <>
          <Sidebar />
        </>
      )}

      <div className="main">
        <TopBar />
        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="card pb-3">
                  <div className="card-header">
                    <h5>New Invoice</h5>
                  </div>
                  <div
                    className={`card-body ${
                      param.screen == 1
                        ? "contaner-area-min"
                        : "contaner-area-min"
                    }`}
                  >
                    {param.screen == 1 && <InvoiceForm />}
                    {param.screen == 2 && <InvoiceForm />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddInvoiceDetail;
