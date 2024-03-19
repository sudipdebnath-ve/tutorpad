import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import FetchChargeCategoryDatatable from "./FetchFamilyInvoiceDatatable.js";
import "../users/assets/css/customDatepicker.css";
import { Link } from "react-router-dom";

const Family = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                    <div className="card-header">
                    <div style={{display:'flex',flexDirection:'column',}}>
                        <Link to={"/familiies-and-invoices/transaction-type/1"}>
                            <div
                            style={{width:'fit-content'}}
                                className="dropdown addnew"
                                onClick={()=>{}}
                            >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                <a className="btn">Add New</a>
                            </div>
                        </Link>
                        <div style={{lineHeight:'5px',marginTop:'22px'}}>
                            <p><strong>You're owed ₹ 100.00 as of</strong> 31-03-2024 </p>
                            <p><strong>Prepaid Balance: ₹ 100.00</strong> </p>
                        </div>
                    </div>
                    </div>
                    <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                        <FetchChargeCategoryDatatable setIsEdit={setIsEdit} setModalIsOpen={setModalIsOpen} set_chargecat_name={set_chargecat_name} setSelectedId={setSelectedId} />
                    </div>
                    </div>
                </div>
                </div>
            </div>
}
export default Family;