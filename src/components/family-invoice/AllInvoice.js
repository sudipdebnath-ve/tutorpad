import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';

import "../users/assets/css/customDatepicker.css";
import { Link, useParams } from "react-router-dom";
import FetchAllInvoiceDatatable from "./FetchAllInvoiceDatatable";


const AllInvoice = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    const param = useParams();
    const [fromDate,setFromDate] = useState(getTodayDate());
    const [toDate,setToDate] = useState(getTodayDate());
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

    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                <div className="card-header">
                <div style={{display:'flex',flexDirection:'column',}}>
                        <div className="row">
                            <div className="col-md-6">
                                <label>From Date</label>
                                <input value={fromDate} onChange={(e)=>setFromDate(e.target.value)} type="date" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label>To Date</label>
                                <input value={toDate} onChange={(e)=>setToDate(e.target.value)} type="date" className="form-control" />
                            </div>
                        </div>
                        <div style={{lineHeight:'5px',marginTop:'22px'}}>
                            <p><strong>You're owed ₹ 100.00 as of</strong> 31-03-2024 </p>
                        </div>
                    </div>
                    </div>
                    <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                        <FetchAllInvoiceDatatable setIsEdit={setIsEdit} setModalIsOpen={setModalIsOpen} set_chargecat_name={set_chargecat_name} setSelectedId={setSelectedId} id={param?.id} />
                    </div>
                    </div>
                </div>
                </div>
            </div>
}
export default AllInvoice;