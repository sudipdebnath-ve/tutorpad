import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import FetchFamilyTransactionDatatable from "./FetchFamilyTransactionDatatable.js";
import "../users/assets/css/customDatepicker.css";
import { Link, useParams } from "react-router-dom";
import { getOwedBalance } from "../../services/invoiceService.js";
const TransactionByFamily = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [owedBalance, setOwedBalance] = useState("");
    const param = useParams();

    console.log("from transaction by family------------", param);

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

    useEffect(()=>{
        owedBalanceHandler();
    }, [])

    
    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                <div className="card-header">
                    <div style={{display:'flex',flexDirection:'column',}}>
                        <Link to={"/familiies-and-invoices/transaction-type/1/"+param.id}>
                            <div
                            style={{width:'fit-content'}}
                                className="dropdown addnew"
                                onClick={()=>{}}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                <a className="btn">New Transaction</a>
                            </div>
                        </Link>
                        <div style={{lineHeight:'5px',marginTop:'22px', width:'350px'}}>
                            <div className="row">
                                <div className="col-6"><strong className="txt">You're owed  ₹ {owedBalance} as of</strong></div>
                                <div className="col-6">  <div className="custom-datepicker-container">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="custom_datepicker"
                                />
                                {/* <span className="down-arrow">&#9660;</span> */}
                                </div></div>
                            
                          
                            </div>
                           
                             
                        </div>
                    </div>
                    </div>
                    <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                        <FetchFamilyTransactionDatatable setIsEdit={setIsEdit} setModalIsOpen={setModalIsOpen} set_chargecat_name={set_chargecat_name} setSelectedId={setSelectedId} />
                    </div>
                    </div>
                </div>
                </div>
            </div>
}
export default TransactionByFamily;