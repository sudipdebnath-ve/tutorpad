import React, { useState } from "react";
import Icon from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather/chevronLeft";
import { Link, useParams } from "react-router-dom";
import { MiniSidebar, Sidebar, TopBar } from "../sidebar";
import { useUserDataContext } from "../../contextApi/userDataContext";
import "./style.css";
import { ToastContainer } from "react-toastify";
import AutoInvoiceRepeatBox from "./AutoInvoiceRepeatBox";

const AutoInvoiceForm = () => {
  const [transaction_date, set_transaction_date] = useState();
  const [event_frequency, set_event_frequency] = useState("Daily");
  const [event_repeat_on, set_event_repeat_on] = useState(["Mon","Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  const [event_frequency_val, set_event_frequency_val] = useState("");
  const [event_repeat_indefinitely, set_event_repeat_indefinitely] = useState(true);
  const [event_repeat_until, set_event_repeat_until] = useState("");
  const { sidebarToggle, allFamilies } = useUserDataContext();
  const param = useParams();
  return (
    <>
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

      <div className="main bg-color">
        <TopBar />
        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
              {/* <div className="card"> */}
                
      {/* <ToastContainer />
      <div className="card-header">
                        <h5>Add Transaction</h5>
                    </div> */}
      <div className = "invoice-details-wrapper">
      <div className="payment-type-box"  >
      <Link to={"/familiies-and-invoices"}>
        <Icon icon={chevronLeft} /> Back To Families & Invoices
      </Link>
      <div className="automatic-invoicing">
        Automatic Invoicing
      </div>
        <div className="card card-body form-area">
            <span style={{ paddingBottom: "20px" }}>Step {param.screen == 1 ? "1/2" : "2/2"}</span>

        <div className="row">
            <div className="col-md-12">
                <h4 style={{ textAlign: "left", paddingBottom: "20px" }}>
                    {" "}
                    <strong>Invoice Details</strong>
                </h4>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12 form-field-label-text">
                <div style={{ textAlign: "left", fontWeight: 600, paddingBottom: "15px" }}>
                      {" "}
                      When do you want the next billing cycle to start?
                </div>
                <div className="col-md-6 date-input-enable-autoinvoice">
                      {/* <label>Date</label> */}
                    <input
                        type="date"
                        value={transaction_date}
                        onChange={(e) => set_transaction_date(e.target.value)}
                        className="form-control"
                        name=""
                        style={{ width:"300px", height:"40px"}}
                    />
                </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-field-label-text">
              <div style={{ textAlign: "left", fontWeight: 600, paddingBottom:"10px", paddingTop:"25px" }}>
                {" "}
                What do you want to invoice for?
              </div>
              <div className="col-md-12">
              <div className="input-radio">
                    <input
                        type="radio"
                        value="Prepaid"
                        name="invoiceType"
                        
                    ></input>
                    Upcoming lessions (prepaid)
                    <input
                        type="radio"
                        value="Postpaid"
                        name="invoiceType"
                       
                    ></input>
                    Previous lessions (postpaid)
                  
                    </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12" style={{ padding:"10px", paddingTop:"25px"}}>
              <AutoInvoiceRepeatBox
                event_frequency={event_frequency}
                set_event_frequency={set_event_frequency}
                event_repeat_on={event_repeat_on}
                set_event_repeat_on={set_event_repeat_on}
                event_frequency_val={event_frequency_val}
                set_event_frequency_val={set_event_frequency_val}
                event_repeat_indefinitely={event_repeat_indefinitely}
                set_event_repeat_indefinitely={set_event_repeat_indefinitely}
                event_repeat_until={event_repeat_until}
                set_event_repeat_until={set_event_repeat_until}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-field-label-text">
              <div style={{ textAlign: "left", fontWeight: 600, paddingBottom: "10px"}}>
                {" "}
                When do you want the invoice to be created ?
              </div>
              <div className="col-md-12">
                <div className="input-radio">
                    <input
                        type="radio"
                        value="Weekly"
                        name="frequency"
                        
                    ></input>
                    First day of billing cycle
                    <input
                        type="radio"
                        value="Monthly"
                        name="frequency"
                       
                    ></input>
                    Choose a date
                    </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-field-label-text">
              <div style={{ textAlign: "left", fontWeight: 600, paddingBottom: "10px", paddingTop:"15px"}}>
                {" "}
                What is the due date ?
              </div>
              <div className="col-md-12">
                <div className="input-radio">
                    <input
                        type="radio"
                        value="Weekly"
                        name="frequency"
                        
                    ></input>
                    No due date
                    <input
                        type="radio"
                        value="Monthly"
                        name="frequency"
                       
                    ></input>
                    Choose a date
                    </div>
              </div>
            </div>
          </div>

          <div className="row">
                <div className="col-md-12">
                      <div className="formbold-form-btn-wrapper" style={{justifyContent:"flex-end"}}>
                            <div className="btn-end">
                                  <Link className="cancel" to={'/familiies-and-invoices/transaction-type/'+1+'/'+param.family_id}>
                                        Back
                                    </Link>
                                    <Link className="cancel" to={"/familiies-and-invoices/autoinvoice-invoice-options"}>
                                        Next
                                    </Link>
                            </div>
                      </div>
                </div>
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* </div> */}
      </div>
      </main>
      </div>
      </div>
    </>
  );
};

export default AutoInvoiceForm;
