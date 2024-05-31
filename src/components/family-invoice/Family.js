import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import FetchChargeCategoryDatatable from "./FetchFamilyInvoiceDatatable.js";
import "../users/assets/css/customDatepicker.css";
import { Link } from "react-router-dom";
import { getOwedBalance, getPrepaidBalance } from "../../services/invoiceService.js";

const Family = ()=>{
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [chargecat_name,set_chargecat_name] = useState("");
    const [selectedId,setSelectedId] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [prepaidBalance, setPrepaidBalance] = useState("");
    const [owedBalance, setOwedBalance] = useState("");

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const prepaidInvocieHandler = async ( ) => {
        const response = await getPrepaidBalance();
        console.log("prepaid balance response: ", JSON.stringify(response));
        console.table("prepaid balance response: by table------", response)
        if (response?.success) {
            setPrepaidBalance(response.data.amount);
          } else {
            // Handle error or set a default value
            setPrepaidBalance(0);
          }

    }

    const owedBalanceHandler = async ( ) => {
        const response = await getOwedBalance();
        console.table("owed balance response: by table------", response)
        if (response?.success) {
            setOwedBalance(response.data.amount);
          } else {
            // Handle error or set a default value
            setOwedBalance(0);
          }

    }

    useEffect(() => {
        prepaidInvocieHandler();
        owedBalanceHandler();
    }, [])
    
    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                    <div className="card-header">
                    <div style={{display:'flex',flexDirection:'column',}}>
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
                            <p><strong>Prepaid Balance: { prepaidBalance }</strong> </p>
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