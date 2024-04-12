import React, { useState } from "react";
import { Link, useNavigate, useParams ,useLocation} from "react-router-dom";
import Icon from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather/chevronLeft";
import { MiniSidebar, Sidebar, TopBar } from "../sidebar";
import { useUserDataContext } from "../../contextApi/userDataContext";
import { ToastContainer, toast } from "react-toastify";
import AutoInvoiceRepeatBox from "./AutoInvoiceRepeatBox";
import InvoiceFormatCondensed from "../../assets/images/InvoiceFormatCondensed.svg";
import InvoiceFormatNormal from "../../assets/images/InvoiceFormatNormal.svg";
import InvoiceFormatExpanded from "../../assets/images/InvoiceFormatExpanded.svg";
import "./style.css";
import { enableAutoInoviceById, getAutoInoviceById } from "../../services/invoiceService";

const AutoInvoiceForm = () => {
const location = useLocation();
//   const { state } = location;
//   console.log("state changed------", state?.isChanged, state?.setIsChanged);
  const navigate = useNavigate();
  const param = useParams();
  const { sidebarToggle, allFamilies } = useUserDataContext();
  const [step, setStep] = useState(1);                  // Track current step of the form
  const [transaction_date, set_transaction_date] = useState("");
  const [next_billing_cycle, set_next_billing_cycle] = useState("2024-05-01")
  const [is_prepaid_invoice, set_is_prepaid_invoice] = useState("0");
  const [invoice_create_on, set_invoice_create_on] = useState("1");
  const [invoice_due_type, set_invoice_due_type] = useState("0");
  const [invoice_due_date, set_invoice_due_date] = useState("");
  const [displayType, setDisplayType] = useState("1");
  const [balance_forward, set_balance_forward] = useState("0");
  const [invoice_0, set_invoice_0] = useState("0");
  const [auto_email, set_auto_email] = useState("0");
  const [footer_text, set_footer_text] = useState("")
  const [event_frequency, set_event_frequency] = useState("Monthly");
  const [event_frequency_val, set_event_frequency_val] = useState("1");
  const [frequency, setFrequency] = useState("");
  const [dueDateOption, setDueDateOption] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  

  const handleRadioButtonChange = (e) => {
    if (step === 1) {
      setFrequency(e.target.value);
      set_invoice_create_on(e.target.value);
      
    } else {
      setDisplayType(e.target.value);
    }
    
  };

  // Handlers for date changes
  const handleDueDateChange = (e) => {
    setDueDateOption(e.target.value);
    set_invoice_due_type(e.target.value);
  };

  // Handler for Next button click
  const handleNext = () => {
    if (step === 1) {
      setStep(2); // Move to step 2
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1); // Move back to step 1
    }
  };

  console.log("param.id ----------", param.id);

  const getFrequencyTypeNum = (frequency_val)=>{
    if (frequency_val=="Weekly"){
        return 1;
    }else if (frequency_val=="Monthly")
    {
        return 2;
    }else if (frequency_val=="Yearly")
    {
        return 3;
    }else{
        return 2;
    }
  }
  const handleSave = async () =>{
    const data = {
        next_billing_cycle: next_billing_cycle,
        is_prepaid_invoice: is_prepaid_invoice,
        invoice_create_on: invoice_create_on, 
        invoice_due_type: invoice_due_type,
        invoice_due_date: invoice_due_date,
        displayType:displayType,
        balance_forward: balance_forward,
        invoice_0:  invoice_0,
        auto_email: auto_email,
        footer_text: footer_text,
        invoice_frequency:getFrequencyTypeNum(event_frequency),
        invoice_frequency_val: event_frequency_val,

    }
    if (param?.id){
        const response = await enableAutoInoviceById (data, param.id);
        if(response?.success===true){
            toast.success(response?.message, {
              position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/familiies-and-invoices");
          }, 2000);
          }
          else{
            toast.error("Something went wrong!!!!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
  }
  return (
    <>
     
     <ToastContainer />
      <div className="wrapper">
        {sidebarToggle ? <MiniSidebar /> : <Sidebar />}
        <div className="main bg-color">
          <TopBar />
          <main className="content student">
            <div className="container-fluid p-0">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className="invoice-details-wrapper">
                    <div className="payment-type-box">
                      <Link to={"/familiies-and-invoices"} style={{ width: "100%" }}>
                        <Icon icon={chevronLeft} /> Back To Families & Invoices
                      </Link>
                      <div className="automatic-invoicing">
                        Automatic Invoicing
                      </div>
                      <div className="card card-body form-area">
                        <span style={{ paddingBottom: "20px" }}>
                          Step {step === 1 ? "1/2" : "2/2"}
                        </span>

                        {/* Render different sections of the form based on step */}
                        {step === 1 && (
                          <div>
                            {/* Step 1 content */}
                            <div className="row">
                              <div className="col-md-12">
                                <h4
                                  style={{
                                    textAlign: "left",
                                    paddingBottom: "20px",
                                  }}
                                >
                                  {" "}
                                  <strong>Invoice Details</strong>
                                </h4>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12 form-field-label-text">
                                <div
                                  style={{
                                    textAlign: "left",
                                    fontWeight: 600,
                                    paddingBottom: "15px",
                                  }}
                                >
                                  {" "}
                                  When do you want the next billing cycle to
                                  start?
                                </div>
                                <div className="col-md-6 date-input-enable-autoinvoice">
                                  <input
                                    type="date"
                                    value={next_billing_cycle}
                                    name="next_billing_cycle"
                                    onChange={(e) =>set_next_billing_cycle(e.target.value)}
                                    className="form-control"
                                    style={{ width: "300px", height: "40px" }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12 form-field-label-text">
                                <div
                                  style={{
                                    textAlign: "left",
                                    fontWeight: 600,
                                    paddingBottom: "10px",
                                    paddingTop: "25px",
                                  }}
                                >
                                  {" "}
                                  What do you want to invoice for?
                                </div>
                                <div className="col-md-12">
                                  <div className="input-radio">
                                    <input
                                      type="radio"
                                      value='0'
                                      name="is_prepaid_invoice"
                                      onChange={(e)=> set_is_prepaid_invoice(e.target.value)}
                                      checked={is_prepaid_invoice==='0'}
                                    ></input>
                                    Upcoming lessions (prepaid)
                                    <input
                                      type="radio"
                                      value='1'
                                      name="is_prepaid_invoice"
                                      onChange={(e)=> set_is_prepaid_invoice(e.target.value)}
                                    ></input>
                                    Previous lessions (postpaid)
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div
                                className="col-md-12"
                                style={{ padding: "10px", paddingTop: "25px" }}
                              >
                                <AutoInvoiceRepeatBox
                                  event_frequency={event_frequency}
                                  set_event_frequency={set_event_frequency}
                                  event_frequency_val={event_frequency_val}
                                  set_event_frequency_val={set_event_frequency_val}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div className="col-md-12 form-field-label-text">
                                  <div
                                    style={{
                                      textAlign: "left",
                                      fontWeight: 600,
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    {" "}
                                    When do you want the invoice to be created ?
                                  </div>
                                  <div className="col-md-12">
                                    <div className="input-radio">
                                      <input
                                        type="radio"
                                        value="1"
                                        name="invoice_create_on"
                                        onChange={handleRadioButtonChange}
                                        checked={invoice_create_on==='1'}
                                      ></input>
                                      First day of billing cycle
                                      <input
                                        type="radio"
                                        value="2"
                                        name="invoice_create_on"
                                        onChange={handleRadioButtonChange}
                                        checked={invoice_create_on==='2'}
                                      ></input>
                                      Choose a date
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {frequency === "2" && (
                                <div className="row">
                                  <div className="col-md-12 form-field-label-text">
                                    <div
                                      style={{
                                        textAlign: "left",
                                        fontWeight: 600,
                                        paddingBottom: "15px",
                                      }}
                                    >
                                      {" "}
                                      Invoice Date
                                    </div>
                                    <div className="col-md-6 date-input-enable-autoinvoice">
                                      <input
                                        type="date"
                                        value={transactionDate}
                                        onChange={(e) =>
                                          setTransactionDate(e.target.value)
                                        }
                                        className="form-control"
                                        style={{
                                          width: "300px",
                                          height: "40px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="row">
                              <div className="col-md-12 form-field-label-text">
                                <div
                                  style={{
                                    textAlign: "left",
                                    fontWeight: 600,
                                    paddingBottom: "10px",
                                    paddingTop: "15px",
                                  }}
                                >
                                  {" "}
                                  What is the due date ?
                                </div>
                                <div className="col-md-12">
                                  <div className="input-radio">
                                    <input
                                      type="radio"
                                      value="0"
                                      name="invoice_due_type"
                                      onChange={handleDueDateChange}
                                      checked={invoice_due_type==="0"}
                                    ></input>
                                    No due date
                                    <input
                                      type="radio"
                                      value="1"
                                      name="invoice_due_type"
                                      onChange={handleDueDateChange}
                                      checked={invoice_due_type==="1"}
                                    ></input>
                                    Choose a date
                                  </div>
                                </div>
                              </div>
                            </div>

                            {dueDateOption === "1" && (
                              <div className="row">
                                <div className="col-md-12 form-field-label-text">
                                  <div
                                    style={{
                                      textAlign: "left",
                                      fontWeight: 600,
                                      paddingBottom: "15px",
                                    }}
                                  >
                                    {" "}
                                    Due Date
                                  </div>
                                  <div className="col-md-6 date-input-enable-autoinvoice">
                                    <input
                                      type="date"
                                      value={invoice_due_date}
                                      onChange={(e) =>
                                        set_invoice_due_date(e.target.value)
                                      }
                                      className="form-control"
                                      style={{ width: "300px", height: "40px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {step === 2 && (
                          <div>
                            {/* Step 2 content */}
                            {/* Add your Step 2 form fields here */}

                            <div className="row">
                              <div className="col-md-12">
                                <h4
                                  style={{
                                    textAlign: "left",
                                    paddingBottom: "20px",
                                  }}
                                >
                                  {" "}
                                  <strong>Invoice Options</strong>
                                </h4>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <p
                                  style={{
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    color: "black",
                                    paddingBottom: "10px",
                                  }}
                                >
                                  How do you want to display invoice items?
                                </p>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="display_type"
                                    value="1"
                                    onChange={handleRadioButtonChange}
                                    checked={displayType === "1"}
                                  />
                                  <label className="form-check-label d-flex flex-column">
                                    <span>Condensed</span>
                                    <span className="m-0 p-0 fs-5 text-muted">
                                      Combine identical invoice items into a
                                      single line
                                    </span>
                                  </label>
                                  {/* <img src={InvoiceFormatCondensed} alt="Your SVG" /> */}
                                </div>
                                <div className="form-check">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="display_type"
                                    value="2"
                                    onChange={handleRadioButtonChange}
                                    checked={displayType === "2"}
                                  />
                                  <label class="form-check-label d-flex flex-column">
                                    <span>Normal</span>
                                    <span className="fs-5 text-muted">
                                      Show each item on its own line
                                    </span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="display_type"
                                    value="3"
                                    onChange={handleRadioButtonChange}
                                    checked={displayType === "3"}
                                  />
                                  <label class="form-check-label d-flex flex-column">
                                    <span>Expanded</span>
                                    <span className="fs-5 text-muted">
                                      Include items with no charges
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6 d-flex justify-content-center align-items-center">
                                {/* Conditional rendering of SVG image based on selected display type */}
                                {displayType === "1" && (
                                  <img
                                    src={InvoiceFormatCondensed}
                                    alt="Condensed Image"
                                  />
                                )}
                                {displayType === "2" && (
                                  <img
                                    src={InvoiceFormatNormal}
                                    alt="Normal Image"
                                  />
                                )}
                                {displayType === "3" && (
                                  <img
                                    src={InvoiceFormatExpanded}
                                    alt="Expanded Image"
                                  />
                                )}
                              </div>
                            </div>

                            <hr></hr>

                            <div className="row">
                              <div className="col-md-12 form-field-label-text">
                                <div
                                  style={{
                                    textAlign: "left",
                                    fontWeight: 600,
                                    paddingBottom: "5px",
                                  }}
                                >
                                  {" "}
                                  Balance Forward
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-12"
                              style={{
                                display: "flex",
                                justifyContent: "left",
                                paddingBottom: "20px",
                              }}
                            >
                              <input type="checkbox" 
                               
                               name="balance_forward"
                               onChange={(e)=>set_balance_forward('1')}
                               
                                />
                              <span className="ml-2">
                                Include previous balance & payments on the
                                invoice
                              </span>
                            </div>

                            <div className="row">
                              <div className="col-md-12 form-field-label-text">
                                <div
                                  style={{
                                    textAlign: "left",
                                    fontWeight: 600,
                                    paddingBottom: "5px",
                                  }}
                                >
                                  {" "}
                                  ₹ 0.00 Invoices
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-12"
                              style={{
                                display: "flex",
                                justifyContent: "left",
                                paddingBottom: "20px",
                              }}
                            >
                              <input type="checkbox" 
                                    value = "0"
                                    name="invoice_0"
                                    onChange={(e) =>set_invoice_0("1")}
                                     />
                              <span className="ml-2">
                                Create invoices even if nothing is owing
                              </span>
                            </div>

                            <div className="row">
                              <div className="col-md-12 form-field-label-text">
                                <div
                                  style={{
                                    textAlign: "left",
                                    fontWeight: 600,
                                    paddingBottom: "5px",
                                  }}
                                >
                                  {" "}
                                  Auto-Email
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-12"
                              style={{
                                display: "flex",
                                justifyContent: "left",
                                paddingBottom: "20px",
                              }}
                            >
                              <input 
                                type="checkbox"
                                value = "0"
                                name="auto_email"
                                onChange={(e) =>set_auto_email("1")}
                                />
                              <span className="ml-2">
                                Automatically send invoices on invoice date
                              </span>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <label className="d-flex gap-2">
                                  <span className="fw-bold">Footer Note</span>
                                  <span className="text-muted">Optional</span>
                                </label>
                                <textarea
                                  className="form-control"
                                  value = {footer_text}
                                  name="footer_text"
                                  onChange={(e) => set_footer_text(e.target.value)}
                                  rows="4"
                                  cols="10"
                                //   placeholder="This note will show at the bottom of your invoice."
                                  style={{ height: "auto", width: "100%" }}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="row">
                          <div className="col-md-12">
                            <div
                              className="formbold-form-btn-wrapper"
                              style={{ justifyContent: "flex-end" }}
                            >
                              <div className="btn-end">
                              <Link
                                  className="cancel"
                                  to={"/familiies-and-invoices"}
                                >
                                  Cancel
                                </Link>
                                {/* Render Next or Back button based on step */}
                                {step === 1 && (
                                  <button
                                  className="formbold-btn"
                                  onClick={handleNext}
                                >
                                  Next
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_1675_1807)">
                                      <path
                                        d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z"
                                        fill="white"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_1675_1807">
                                        <rect width="16" height="16" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                                )}
                                {step === 2 && (
                                  <button
                                    className="cancel"
                                    onClick={handleBack}
                                  >
                                    Back
                                  </button>
                                )}
                                
                                {/* Render Save button only on Step 2 */}
                                {step === 2 && (
                                  <button
                                    className="cancel"
                                    onClick={handleSave}
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AutoInvoiceForm;
