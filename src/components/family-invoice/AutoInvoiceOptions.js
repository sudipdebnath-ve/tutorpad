import React, { useState } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import Icon from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather/chevronLeft";
import InvoiceFormatCondensed from "../../assets/images/InvoiceFormatCondensed.svg";
import InvoiceFormatNormal from "../../assets/images/InvoiceFormatNormal.svg";
import InvoiceFormatExpanded from "../../assets/images/InvoiceFormatExpanded.svg";
const AutoInvoiceOptions = () => {
    const [ displayType, setDisplayType] = useState('2');

    // Function to handle radio button change
    const handleRadioButtonChange = (event) => {
        setDisplayType(event.target.value);
    };
  const param = useParams();
  return (
    <>
      <div className="automatic-invoicing">Automatic Invoicing</div>

      <div className="payment-type-box">
        <Link to={"/familiies-and-invoices"}>
            <Icon icon={chevronLeft} /> Back To Families & Invoices
        </Link>
        <div className="card card-body form-area">
          <span style={{ paddingBottom: "20px" }}>Step {param.screen == 1 ? "1/2" : "2/2"}</span>
          <div className="row">
            <div className="col-md-12">
              <h4 style={{ textAlign: "left" ,paddingBottom: "20px" }}>
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
                    paddingBottom: "10px"
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
                    onChange={handleRadioButtonChange}
                    checked={displayType === '1'}
                  />
                    <label className="form-check-label d-flex flex-column">
                    <span>Condensed</span>
                    <span className="m-0 p-0 fs-5 text-muted">Combine identical invoice items into a single line</span>
                    </label>
                    {/* <img src={InvoiceFormatCondensed} alt="Your SVG" /> */}
                </div>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="display_type"
                    value='2'
                    onChange={handleRadioButtonChange}
                    checked={displayType === '2'}
                  />
                  <label class="form-check-label d-flex flex-column">
                    <span>Normal</span>
                  <span className="fs-5 text-muted">Show each item on its own line</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="display_type"
                    value='3'
                    onChange={handleRadioButtonChange}
                    checked={displayType === '3'}
                  />
                  <label class="form-check-label d-flex flex-column">
                    <span>Expanded</span>
                  <span className="fs-5 text-muted">Include items with no charges</span>
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

          <hr></hr>

        
          <div className="row">
                <div className="col-md-12 form-field-label-text">
                    <div style={{ textAlign: "left", fontWeight: 600, paddingBottom: "5px" }}>
                            {" "}
                            Balance Forward
                    </div>
                </div>
            </div>
            <div className="col-md-12" style={{ display: "flex", justifyContent: "left", paddingBottom: "20px" }}>
                <input type="checkbox" name="" />
                <span className="ml-2">Include previous balance & payments on the invoice</span> 
            </div>

            <div className="row">
                     <div className="col-md-12 form-field-label-text">
                            <div style={{ textAlign: "left", fontWeight: 600, paddingBottom: "5px"}}>
                                    {" "}
                                     ₹ 0.00 Invoices
                             </div>
                     </div>
            </div>
            <div className="col-md-12" style={{ display: "flex", justifyContent: "left", paddingBottom: "20px" }}>
                          <input type="checkbox" name="" />
                                <span className="ml-2">Create invoices even if nothing is owing</span> 
            </div>


            <div className="row">
                    <div className="col-md-12 form-field-label-text">
                            <div style={{ textAlign: "left", fontWeight: 600, paddingBottom: "5px" }}>
                                    {" "}
                                    Auto-Email
                            </div>
                    </div>
            </div>
            <div className="col-md-12" style={{ display: "flex", justifyContent: "left", paddingBottom: "20px" }}>
                <input type="checkbox" name="" />
                    <span className="ml-2">Automatically send invoices on invoice date</span> 
            </div>


            <div className="row">
                <div className="col-md-12 form-field-label-text">
                    <div style={{ textAlign: "left", fontWeight: 600, paddingBottom:"10px" }}>
                        {" "}
                        Footer Note Optional
                     </div>
                </div>
            </div>

            <textarea id="footer-note" name="footer-note" rows="4" cols="50"></textarea>  


            

         

          <div className="row">
            <div className="col-md-12">
              <div className="formbold-form-btn-wrapper">
                <div className="btn-end">
                  <Link className="cancel" to={ "/familiies-and-invoices/transaction-type/" + 1 +  "/" + param.family_id } >
                        Back
                  </Link>
                  <Link className="cancel" to={"/familiies-and-invoices"}>
                    Cancel
                  </Link>

                  <Link className="cancel" to= { " "}>
                    Save
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoInvoiceOptions;
