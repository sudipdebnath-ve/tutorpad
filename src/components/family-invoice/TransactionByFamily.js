import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import FetchFamilyTransactionDatatable from "./FetchFamilyTransactionDatatable.js";
import "../users/assets/css/customDatepicker.css";
import { Link, useParams } from "react-router-dom";
const TransactionByFamily = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    const param = useParams();
    console.log(param);
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
                        <div style={{lineHeight:'5px',marginTop:'22px'}}>
                            <p><strong>You're owed ₹ 100.00 as of</strong> 31-03-2024 </p>
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