import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import Select from "react-select";
import { Link } from "react-router-dom";
const PaymentRefundForm = () => {
 
  return  <> 
          <div className="payment-type-box">
              <div className="card card-body form-area">
                  <div className="row">
                      <div className="col-md-12">
                          <h4 style={{textAlign:'left'}}>Payment Details</h4>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <label>Family</label>
                          <Select defaultValue={1}  onChange={(e)=>{}} isMulti={true} options={[{label:'Nitai Koiri',id:1}]} />
                      </div>
                      <div className="col-md-6">
                          <label>Student(Optional)</label>
                          <Select defaultValue={1}  onChange={(e)=>{}} isMulti={false} options={[{label:'Nitai Koiri',id:1}]} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <label>Date</label>
                          <input type="date" className="form-control" name="" /> 
                      </div>
                      <div className="col-md-6">
                          <label>Amount</label>
                          <input type="number" className="form-control" name="" /> 
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <label>Description</label>
                          <textarea placeholder="This will appear on the invoice " className="form-control" name=""></textarea> 
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-12">
                          <input type="checkbox" name="" />
                          <span className="ml-2">Send an email receipt</span> 
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                      <div className="formbold-form-btn-wrapper">
                          <div className="btn-end">
                              <Link className="cancel" onClick={()=>{}}>
                              Back
                              </Link>
                              <Link className="cancel" onClick={()=>{}}>
                              Cancel
                              </Link>
                              <button
                                  className="cancel"
                                  onClick={(e)=>{}}
                              >
                                  Save & Add Another
                              </button>
                              <button className="formbold-btn" onClick={(e)=>{}}>
                              Save
                              </button>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </> 
};

export default PaymentRefundForm;
