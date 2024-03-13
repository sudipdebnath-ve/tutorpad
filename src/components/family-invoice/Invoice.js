import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import FetchChargeCategoryDatatable from "./FetchFamilyInvoiceDatatable.js";
import "../users/assets/css/customDatepicker.css";

const Invoice = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                    <div className="card-header">
                    <div
                        className="dropdown addnew"
                        onClick={()=>{}}
                    >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <a className="btn">Add New</a>
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
export default Invoice;