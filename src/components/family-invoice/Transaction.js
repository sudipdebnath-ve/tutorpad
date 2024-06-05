import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import FetchTransactionDatatable from "./FetchTransactionDatatable.js";
import "../users/assets/css/customDatepicker.css";
import { Link, useParams } from "react-router-dom";
import { getOwedBalance } from "../../services/invoiceService.js";

const Transaction = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    const [fromDate,setFromDate] = useState(getTodayDate());
    const [toDate,setToDate] = useState(getTodayDate());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [owedBalance, setOwedBalance] = useState("");
    const param = useParams();
    console.log("from transaction ------------", param);
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const owedBalanceHandler = async ( ) => {
        const response = await getOwedBalance();
        // console.table("owed balance response: by table------", response)
        if (response?.success) {
            setOwedBalance(response.data.amount);
          } else {
            // Handle error or set a default value
            setOwedBalance(0);
          }
    }
      
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


    useEffect(()=>{
        owedBalanceHandler();
    }, [])
    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                <div className="card-header">
                    <div style={{display:'flex',flexDirection:'column',}}>
                    <Link to={"/familiies-and-invoices/transaction-type/1/"+param.id}>
                            {/* <div
                            style={{width:'fit-content'}}
                                className="dropdown addnew"
                                onClick={()=>{}}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                <a className="btn">New Transaction</a>
                            </div> */}
                        </Link>
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
                            <p><strong>You're owed ₹ {owedBalance} as of</strong> 
                            <div className="custom-datepicker-container">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="custom_datepicker"
                                />
                                {/* <span className="down-arrow">&#9660;</span> */}
                                </div>
                             </p>
                        </div>
                    </div>
                    </div>
                    <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                        <FetchTransactionDatatable fromDate={fromDate} toDate={toDate} setIsEdit={setIsEdit} setModalIsOpen={setModalIsOpen} set_chargecat_name={set_chargecat_name} setSelectedId={setSelectedId} />
                    </div>
                    </div>
                </div>
                </div>
            </div>
}
export default Transaction;