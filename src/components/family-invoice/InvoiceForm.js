import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Select from "react-select";
import { Link, useParams, useNavigate } from "react-router-dom";
import { chevronLeft } from "react-icons-kit/feather/chevronLeft";
import { Icon } from "react-icons-kit";
import { ToastContainer, toast } from "react-toastify";

import InvoiceFormatCondensed from '../../assets/images/InvoiceFormatCondensed.svg'
import InvoiceFormatNormal from '../../assets/images/InvoiceFormatNormal.svg'
import InvoiceFormatExpanded from '../../assets/images/InvoiceFormatExpanded.svg'
import {
  getFamilyAccounts,
  getFamilyAccountsDetails,
  getTransactionById,
  createInvoice
} from "../../services/invoiceService";
const InvoiceForm = () => {
  const navigate = useNavigate();
  const [family_account_id, set_family_account_id] = useState([]);
  const [invoice_create_date, set_invoice_create_date] = useState(getTodayDate());
  const [skip_0_invoices, set_skip_0_invoices] =useState(0);
  const [charge_category, set_charge_category] = useState();
  const [date_range_charges, set_date_range_charges] =useState('1');
  const [invoice_start_date, set_invoice_start_date] = useState(getStartOfMonth());
  const [invoice_end_date, set_invoice_end_date] = useState(getEndOfMonth());
  const [invoice_due_type, set_invoice_due_type] =useState('1');
  const [invoice_due_date, set_invoice_due_date] =useState();
  const [email_immediately,set_email_immediately]=useState('0');
  const [private_note, set_private_note] = useState('');
  const [error, setError] = useState();
 
  const [familiies, set_familiies] = useState([]);
  const [family_account, set_family_account] = useState([]);
  const [show_form2, set_show_form2] = useState(false);
  const [show_category_input, set_show_category_input] = useState(false);
  const [show_due_date, set_show_due_date] = useState(false);
  const [displayType, setDisplayType] = useState('2');
  const [showPrivateNote, setShowPrivateNote] = useState(false);
  const param = useParams();


  const handleCheckboxChange = (e) => {
    setShowPrivateNote(e.target.checked);
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is less than 10
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  function getStartOfMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
  
    // Calculate the first day of the current month
    const startDate = new Date(year, month - 1, 1);
  
    // Format the start date
    const startYear = startDate.getFullYear();
    let startMonth = startDate.getMonth() + 1;
    let startDay = startDate.getDate();
  
    // Add leading zero if month or day is less than 10
    if (startMonth < 10) {
      startMonth = '0' + startMonth;
    }
    if (startDay < 10) {
      startDay = '0' + startDay;
    }
  
    return `${startYear}-${startMonth}-${startDay}`;
  }
  
  function getEndOfMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
  
    // Calculate the last day of the current month
    const endDate = new Date(year, month, 0);
  
    // Format the end date
    const endYear = endDate.getFullYear();
    let endMonth = endDate.getMonth() + 1;
    let endDay = endDate.getDate();
  
    // Add leading zero if month or day is less than 10
    if (endMonth < 10) {
      endMonth = '0' + endMonth;
    }
    if (endDay < 10) {
      endDay = '0' + endDay;
    }
  
    return `${endYear}-${endMonth}-${endDay}`;
  }
  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if(name === "skip_0_invoices"){
      set_skip_0_invoices("1");
    }
    if(name === "invoice_create_date"){
      set_invoice_create_date(value);
    }
    if(name === "date_range_charges"){
      set_date_range_charges(value);
      // Show the Category input field only if "Only charges & discounts within the date range" is selected
      set_show_category_input(value === '0');
    }

    if(name === "invoice_start_date"){
      set_invoice_start_date(value);
    }
    if(name === "invoice_end_date"){
      set_invoice_end_date(value);
    }

    if(name === "invoice_start_date"){
      set_invoice_start_date(value);
    }

    if(name === "invoice_due_type"){
      set_invoice_due_type(value);
      set_show_due_date(value === '2');
    }

    if(name === "invoice_due_date"){
      set_invoice_due_date(value);
    }

    if(name === "display_type"){
      setDisplayType(value);
    }

    if(name === 'email_immediately'){
      set_email_immediately(value);
    }

    if(name === 'private_note'){
      set_private_note(value);
    }

  }

//  console.log(param)

  const getFamilyAccountsHandler = async () => {
    const responseFamilies = await getFamilyAccounts();
    set_familiies(responseFamilies?.data || []);

    const selectedFamilies = responseFamilies?.data.map((e) => {
      return { value: e.id, label: e.name };
    });
    console.log(selectedFamilies);
    
    set_family_account_id(selectedFamilies[0]);
    set_family_account(selectedFamilies[0]);

  };

  // const getFamilyAccountsDetailsHandler = async (value) => {
  //   set_student_id("");
  //   set_students([]);
  //   const response = await getFamilyAccountsDetails(value.value);
  //   set_students(response.data.students);
  // };

  const handleShowForm2 = () => {
    set_show_form2(true);
  };


  const backToForm1Handler = () => {
    // Logic to go back to Form 1
    set_show_form2(false);
  };

  const saveInvoiceDetails = async () => {
    const data = {
      family_account_ids: param?.family_id ? [param?.family_id] : family_account_id || []  ,
      invoice_create_date: invoice_create_date,
      skip_0_invoices: skip_0_invoices,
      charge_category: charge_category ,
      date_range_charges: date_range_charges,
      invoice_start_date: invoice_start_date,
      invoice_end_date: invoice_end_date,
      invoice_due_type: invoice_due_type,
      invoice_due_date: invoice_due_date,
      display_type: displayType,
      email_immediately: email_immediately,
      private_note: private_note,
    };


    const response = await createInvoice(data);
    console.log(response);
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
  };

  useEffect(() => {
    getFamilyAccountsHandler();
  }, [param]);

//   console.log("familiies:", familiies);
// console.log("param.family_id:", param.family_id);
// console.log(family_name);


  return (
    <>
    <ToastContainer />
        <Link to={"/familiies-and-invoices/"}>
          <Icon icon={chevronLeft} /> Back To Family Account
        </Link>
      {!show_form2 ? (
        <>
          <div className="payment-type-box">
            <div className="card card-body form-area">
              <div className="row mt-2">
                <div className="col-md-12">
                  <span style={{ textAlign: "left" }}>Step 1/2</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Who do you want to create an invoice for?
                  </p>
                </div>
              </div>
              {param?.family_id ? (
                <div className="row">
                  <div className="col-md-12">
                  <p className="fw-bold">{familiies.find((e) => e.id == param.family_id)?.name}</p>
                  </div>
                </div>
              ) : (
              <div className="row">
                <div className="col-md-12">
                  <label className="fw-bold text-dark">Family</label>
                  <Select
                     name="family_account_id"
                     defaultValue={family_account}
                    onChange={(selectedOptions) => {
                      //set_family_account_id(e);
                      // getFamilyAccountsDetailsHandler(e);
                      if (Array.isArray(selectedOptions)) {
                        // If selectedOptions is an array (multiple selections)
                        set_family_account_id(selectedOptions.map(option => option.value));
                      } else {
                        // If selectedOptions is not an array (single selection)
                        set_family_account_id([selectedOptions.value]);
                      }
                    }}
                    isMulti={true}
                    options={[
                      ...familiies.map((e) => {
                        return { value: e.id, label: e.name };
                      }),
                    ]}
                  />
                </div>
              </div>
              )}
              <div className="row mt-3">
                <div className="col-md-12 d-flex gap-2">
                  <input type="checkbox" name="skip_0_invoices"
                  onChange={handleChange} />
                  <span className="ml-3">
                    Skip families with ₹ 0.00 invoices
                  </span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12 d-flex flex-column">
                  <label className="fw-bold">Invoice Date</label>
                  <span className="fs-5 text-muted">
                    Invoice date appears on top of your invoice
                  </span>
                  <input
                    type="date"
                    value={invoice_create_date}
                    onChange={handleChange}
                    className="form-control"
                    name="invoice_create_date"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="mb-2">
                    <span className="fw-bold">
                      What do you want to include?
                    </span>
                  </div>
                  <div className="col-md-12">
                    <input className="form-check-input" type="radio" 
                    name="date_range_charges"
                     value="0"
                     checked={date_range_charges === '0'} 
                     onChange={handleChange} />
                    <label className="form-check-label ml-2">
                      Only charges & discounts within the date range
                    </label>
                  </div>
                  <div>
                    <input className="form-check-input" type="radio" name="date_range_charges"
                     value="1"
                     checked={date_range_charges === '1'} 
                     onChange={handleChange} />
                    <label className="form-check-label ml-2">
                      Include previous balance & payments from before the start
                      date
                    </label>
                  </div>
                </div>
              </div>
              {show_category_input && 
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="fw-bold">Categories</label>
                  <span className="ml-2 text-muted">Optional</span>
                  <input type="text" className="form-control" name="categories" onChange={handleChange} />
                </div>
              </div>
              }
              <hr />
              <div className="row mt-3">
                <div className="col-md-12 ">
                  <p
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    What date range do you want the invoice to cover?
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="fw-bold">Start Date</label>
                  <input type="date" value={invoice_start_date} className="form-control" name="invoice_start_date"
                  onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold">End Date</label>
                  <input type="date" value={invoice_end_date} className="form-control" name="invoice_end_date"
                  onChange={handleChange} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <p
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    What is the due date?
                  </p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="invoice_due_type"
                      value='1'
                      checked = {invoice_due_type === '1'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No due date</label>
                  </div>
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="invoice_due_type"
                      value='2'
                      checked = {invoice_due_type === '2'}
                      onChange={handleChange}
                    />
                    <label class="form-check-label">Choose a Date</label>
                  </div>
                </div>
              </div>
              {show_due_date && 
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="fw-bold">Due Date</label>
                  <input type="date" className="form-control" name="invoice_due_date"
                  onChange={handleChange} />
                </div>
              </div>
            }
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <div className="formbold-form-btn-wrapper">
                    <div className="btn-end">
                      <Link className="cancel" to={"/familiies-and-invoices"}>
                        Cancel
                      </Link>
                      <button
                        onClick={() => handleShowForm2()}
                        className="formbold-btn"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        <div className="payment-type-box">
          <div className="card card-body form-area">
            <div className="row mt-2">
              <div className="col-md-12">
                 <span style={{ textAlign: "left" }}>Step 2/2</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Tell us more about the invoice
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  How do you want to display invoice items?
                </p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="display_type"
                    value='1'
                    onChange={handleChange}
                    checked={displayType === '1'}
                  />
                    <label className="form-check-label d-flex flex-column">
                    <span>Condensed</span>
                    <span className="m-0 p-0 fs-5 text-muted">Combine identical invoice items into a single line</span>
                    </label>
                </div>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="display_type"
                    value='2'
                    onChange={handleChange}
                    checked={displayType === '2'}
                  />
                  <label class="form-check-label d-flex flex-column">
                    <span>Normal</span>
                  <span className="fs-5 text-muted">Show each lesson / event on its own line</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="display_type"
                    value='3'
                    onChange={handleChange}
                    checked={displayType === '3'}
                  />
                  <label class="form-check-label d-flex flex-column">
                    <span>Expanded</span>
                  <span className="fs-5 text-muted">Include lessons / events with no charges</span>
                  </label>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
              {/* Conditional rendering of SVG image based on selected display type */}
              {displayType === '1' && (
                <img src={InvoiceFormatCondensed} alt="Condensed Image" />
              )}
              {displayType === '2' && (
                <img src={InvoiceFormatNormal} alt="Normal Image" />
              )}
              {displayType === '3' && (
                <img src={InvoiceFormatExpanded} alt="Expanded Image" />
              )}
            </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="d-flex gap-2">
                <span className="fw-bold">Footer Note</span>
                 <span className="text-muted">Optional</span>
                </label>
                <textarea className="form-control" 
                name="notes" rows="4" cols="10"
                placeholder="This note will show at the bottom of your invoice."
                style={{ height: 'auto', width: '100%' }}
                onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12 d-flex gap-2">
                  <input type="checkbox" name="" className="form-check-input"
                  onChange={handleCheckboxChange} />
                  <span className="ml-3">
                  I'd like to add a private note for my records
                  </span>
                </div>
              </div>
              {showPrivateNote && 
              <div className="row mt-3">
              <div className="col-md-12">
                <label className="d-flex gap-2">
                <span className="fw-bold">Private Note</span>
                 <span className="text-muted">Optional</span>
                </label>
                <textarea className="form-control" 
                name="private_note" rows="4" cols="10"
                
                placeholder="An optional, private note. This will NOT be included on the invoice."
                onChange={handleChange}
                style={{ height: 'auto', width: '100%' }}></textarea>
              </div>
            </div>
            }
            <hr />
            
            <div className="row mt-3">
              <div className="col-md-12">
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                 Do you want to email the invoice?
                </p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="email_immediately"
                    value='0'
                    onChange={handleChange}
                  />
                  <label className="form-check-label d-flex flex-column">
                    <span>Create but don't email</span>
                    <span className="fs-5 text-muted">You can email this invoice later</span>
                    </label>
                </div>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value='1'
                    name="email_immediately"
                    onChange={handleChange}
                  />
                  <label class="form-check-label">Email invoices immediately</label>
                </div>
              </div>
            </div>
            
            <hr />
            <div className="row">
              <div className="col-md-12">
                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <button
                    className="cancel" onClick={backToForm1Handler}>
                      Back
                    </button>
                    <button
                      onClick={() => saveInvoiceDetails()}
                      className="formbold-btn"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
    </>
  );
};

export default InvoiceForm;
